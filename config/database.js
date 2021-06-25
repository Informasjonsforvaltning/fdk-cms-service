module.exports = ({ env }) => {
  const connection = env('CONNECTION', 'default');
  console.log(`Current Connection: ${connection}`);

  return {
    defaultConnection: connection,
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: 'sqlite',
          filename: env('DATABASE_FILENAME', '.tmp/data.db')
        },
        options: {
          useNullAsDefault: true
        }
      },
      production: {
        connector: 'bookshelf',
        settings: {
          client: 'postgres',
          host: env('POSTGRES_HOST'),
          port: env.int('POSTGRES_PORT', 5432),
          database: env('POSTGRES_NAME'),
          username: env('POSTGRES_USERNAME'),
          password: env('POSTGRES_PASSWORD'),
          ssl: {
            rejectUnauthorized: env.bool('POSTGRES_SSL_SELF', false) // For self-signed certificates
          }
        },
        options: {
          useNullAsDefault: true
        }
      }
    }
  };
};
