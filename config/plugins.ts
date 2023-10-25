export default ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET'),
      jwt: {
        expiresIn: '7d',
      },
    },
  },
  graphql: {
    enabled: true,
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 10,
      defaultLimit: 100,
      apolloServer: {
        introspection: true,
        tracing: false,
      },
    }
  },
  email: {
    enabled: true,
    config: {
      provider: 'nodemailer',
      providerOptions: {
        sendmail: true,
        newline: 'unix',
        path: '/usr/bin/sendmail'
      },
      settings: {
        defaultFrom: 'datalandsbyen@norge.no',
        defaultReplyTo: 'datalandsbyen@norge.no'
      }
    }
  },
  'import-export-entries': {
    enabled: true,
    config: {},
  },
});
