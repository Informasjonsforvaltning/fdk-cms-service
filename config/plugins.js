module.exports = ({ env }) => ({
  email: {
    provider: 'nodemailer',
    providerOptions: {
      sendmail: true,
      newline: 'unix',
      path: '/usr/bin/sendmail'
    },
    settings: {
      defaultFrom: 'datalandsbyen@norge.no',
      defaultReplyTo: 'datalandsbyen@norge.no',
    },
  },
});
