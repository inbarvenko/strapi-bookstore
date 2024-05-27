module.exports = () => ({
    email: {
        config: {
          provider: 'sendgrid',
          providerOptions: {
            apiKey: process.env.SENDGRID_API_KEY,
          },
          settings: {
            defaultFrom: 'ibarvenko@sfedu.ru',
            defaultReplyTo: 'ibarvenko@sfedu.ru',
            testAddress: 'inga_barvenko@mail.ru',
          },
        },
      },
});
