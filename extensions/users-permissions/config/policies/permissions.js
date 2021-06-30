'use strict';

const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');
const oAuth2Client = new OAuth2Client();

module.exports = async (ctx, next) => {
  let role = await strapi
    .query('role', 'users-permissions')
    .findOne({ type: 'public' }, []);

  if (process.env.NODE_ENV === 'development' && ctx.state.user) {
    // request is already authenticated in a different way
    return next();
  }

  if (
    ctx.request &&
    ctx.request.header &&
    ctx.request.header['x-goog-iap-jwt-assertion']
  ) {
    if (ctx.state.user) {
      // request is already authenticated in a different way
      return next();
    }
    const iapJwt = ctx.request.header['x-goog-iap-jwt-assertion'];
    const response = await oAuth2Client.getIapPublicKeys();
    const ticket = await oAuth2Client.verifySignedJwtWithCertsAsync(
      iapJwt,
      response.pubkeys,
      expectedAudience,
      ['https://cloud.google.com/iap']
    );
    const payload = ticket.getPayload();
    if (!ticket || !payload) {
      return handleErrors(ctx, undefined, 'forbidden');
    }

    const email = payload.email;

    ctx.state.user = await strapi.plugins[
      'users-permissions'
    ].services.user.fetch({ email }, ['role']);

    if (!ctx.state.user) {
      try {
        const advanced = await strapi
          .store({
            environment: '',
            type: 'plugin',
            name: 'users-permissions',
            key: 'advanced'
          })
          .get();

        const defaultRole = await strapi
          .query('role', 'users-permissions')
          .findOne({ type: advanced.default_role }, []);

        ctx.state.user = await strapi.plugins[
          'users-permissions'
        ].services.user.add({
          username: email,
          email,
          role: defaultRole,
          confirmed: true
        });
      } catch (err) {
        console.log('Exception in user creation in permissions', err);
      }
    }

    role = ctx.state.user.role;
  }

  const route = ctx.request.route;
  const permission = await strapi
    .query('permission', 'users-permissions')
    .findOne(
      {
        role: role.id,
        type: route.plugin || 'application',
        controller: route.controller,
        action: route.action,
        enabled: true
      },
      []
    );

  if (!permission) {
    return handleErrors(ctx, undefined, 'forbidden');
  }

  // Execute the action.
  await next();
};

const handleErrors = (ctx, err = undefined, type) => {
  throw strapi.errors[type](err);
};
