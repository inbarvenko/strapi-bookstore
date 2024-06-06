'use strict';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {
    async postPayment(ctx) {
      console.log(">>>>> ctx", ctx)
      console.log(">>>>> ctx.request.body", ctx.request.params)
      console.log(">>>>> ctx.request", ctx.request)

        const amount = ctx.request.params.amount;
        const currency = ctx.request.params.currency;
        const currencyLow = currency.toLowerCase();

        console.log('hello');


        const customer = await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create(
          {customer: customer.id},
          {apiVersion: '2024-04-10'}
        );

        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount * 100,
          currency: currencyLow,
          customer: customer.id,
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter
          // is optional because Stripe enables its functionality by default.
          automatic_payment_methods: {
            enabled: true,
          },
        });

        return {
          paymentIntent: paymentIntent.client_secret,
          ephemeralKey: ephemeralKey.secret,
          customer: customer.id,
          publishableKey: 'pk_test_51POjbsP88LC7e7ZGRrSs3fSdpG53a8kRZWHbSEZfNYCc6BU2TfLQOAeh3f7z6UiJhYGqdGv1AGy6zz3QTccIayxG007oi4qvHw'
        };
        
    },
};
