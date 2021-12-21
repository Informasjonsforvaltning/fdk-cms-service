module.exports = ({ env }) => ({
  email: {
    provider: 'sendmail',
    providerOptions: {
      smtpPort: 587,
      smtpHost: 'localhost'
    },
    settings: {
      defaultFrom: 'datalandsbyen@norge.no',
      defaultReplyTo: 'datalandsbyen@norge.no',
    },
  },
});
