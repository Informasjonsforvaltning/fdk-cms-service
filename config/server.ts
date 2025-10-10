export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  proxy: true, // Trust the reverse proxy
  app: {
    keys: env.array('APP_KEYS')
  },
  url: env.array('SERVER_URL')
});
