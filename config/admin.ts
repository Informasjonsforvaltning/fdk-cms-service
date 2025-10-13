export default ({ env }) => ({
  apiToken: {
    salt: env('API_TOKEN_SALT')
  },
  auth: {
    secret: env('ADMIN_JWT_SECRET')
  },
  session: {
    enabled: true,
    client: 'cookie',
    key: 'strapi.sid',
    prefix: 'strapi:sess:',
    secret: env('ADMIN_JWT_SECRET'),
    cookie: {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 86400000, // 24 hours
      overwrite: true,
      signed: true
    }
  }
});
