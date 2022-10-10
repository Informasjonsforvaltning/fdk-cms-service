export default ({ env }) => ([
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: env.array('CORS_ORIGIN')
    }
  },
  {
    name: 'strapi::poweredBy',
    config: {
      poweredBy: 'Felles datakatalog <data.norge.no>'
    }
  },
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public'
]);
