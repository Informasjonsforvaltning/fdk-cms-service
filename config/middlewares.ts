export default ({ env }) => ([
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::poweredBy',
    config: {
      poweredBy: 'Felles datakatalog <data.norge.no>'
    }
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: env.array('CORS_ORIGIN')
    }
  },
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public'
]);
