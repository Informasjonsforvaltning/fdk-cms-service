const HEALTH_PATHS = new Set(['/', '/admin']);

export default (_config, { strapi }) => {
  return async (ctx, next) => {
    if (HEALTH_PATHS.has(ctx.path) && ctx.method === 'GET') {
      return next();
    }

    const start = Date.now();
    await next();
    const duration = Date.now() - start;

    strapi.log.http(`${ctx.method} ${ctx.url} (${duration} ms) ${ctx.status}`);
  };
};
