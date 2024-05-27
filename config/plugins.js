module.exports = ({env}) => ({
    email: {
        config: {
          provider: 'sendgrid',
          providerOptions: {
            apiKey: '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',
          },
          settings: {
            defaultFrom: 'ibarvenko@sfedu.ru',
            defaultReplyTo: 'ibarvenko@sfedu.ru',
            testAddress: 'inga_barvenko@mail.ru',
          },
        },
      },
});
