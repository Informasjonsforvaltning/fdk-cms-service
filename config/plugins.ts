export default ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET'),
      jwt: {
        expiresIn: '7d'
      }
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
  }
});
