/* eslint no-console: off */
export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('POSTGRES_HOST'),
      port: env.int('POSTGRES_PORT', 5432),
      database: env('POSTGRES_NAME'),
      user: env('POSTGRES_USERNAME'),
      password: env('POSTGRES_PASSWORD'),
      schema: env('POSTGRES_SCHEMA', 'public'),
      ssl: env.bool('POSTGRES_SSL', false)
        ? {
            rejectUnauthorized: env.bool('POSTGRES_SSL_SELF', false) // For self-signed certificates
          }
        : false
    },
    useNullAsDefault: true
  }
});
