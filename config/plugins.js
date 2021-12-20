module.exports = ({ env }) => ({
  email: {
    provider: 'sendmail',
    settings: {
      defaultFrom: 'datalandsbyen@norge.no',
      defaultReplyTo: 'datalandsbyen@norge.no',
    },
  },
});
