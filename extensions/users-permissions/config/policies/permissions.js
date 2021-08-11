const { OAuth2Client } = require('google-auth-library');

const oAuth2Client = new OAuth2Client();

// TODO: Add stuff below
// TODO: Make env variables configurable in config files.
const backendServiceId = process.env.BACKEND_SERVICE_ID; // run `gcloud compute backend-services describe SERVICE_NAME --project=PROJECT_ID --global` (id)
const projectNumber = process.env.PROJECT_NUMBER; // run `gcloud projects describe PROJECT_ID` (projectNumber (INT))
const expectedAudience = `/projects/${projectNumber}/global/backendServices/${backendServiceId}`;

module.exports = async (ctx, next) => {
  let role = await strapi
    .query('role', 'users-permissions')
    .findOne({ type: 'public' }, []);

  const isIapEnabled =
    process.env.NODE_ENV !== 'development' &&
    backendServiceId &&
    projectNumber &&
    process.env.ENABLE_IAP;

  if (!isIapEnabled && ctx.state.user) {
    // request is already authenticated in a different way
    return next();
  }

  if (
    backendServiceId &&
    projectNumber &&
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
    if (!ticket || !payload) {
      throw handleErrors(ctx, undefined, 'forbidden');
    }

    const { email } = payload;

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
        throw new Error('Exception in user creation in permissions');
      }
    }

    role = ctx.state.user.role;
  }

  const { route } = ctx.request;
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
    throw handleErrors(ctx, undefined, 'forbidden');
  }

  // Execute the action.
  return next();
};

const handleErrors = (ctx, err = undefined, type) => strapi.errors[type](err);
