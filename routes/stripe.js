
const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);
const Product = require("../models/Product");

router.post("/payment", async (req, res) => {
//   stripe.paymentIntents.create(
//     {
//      // source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: "inr",
//       payment_method: 'card'
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         res.status(500).json(stripeErr);
//       } else {
//         res.status(200).json(stripeRes);
//       }
//     }
//   );


const lineItems = [];
try {
    for (let item of req.body.items) {
        //Retrieve price object from stripe API:
        const product = await Product.findById(item._id);
    
        lineItems.push({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: product.title,
                    
                },
                unit_amount: product.price*100,
            },
            quantity: item.quantity,
        });
    } 
}catch (e) {
        res.status(500).json({ error: e.message })
      }
try {
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `https://didiersachs.herokuapp.com/success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `https://didiersachs.herokuapp.com/cart`,
    })
    res.json({ url: session.url })
    console.log(session.url);
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
});

router.get('/success/:session_id', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.params.session_id);
  const customer = await stripe.customers.retrieve(session.customer);

  res.json({session:session,customer:customer});
});


module.exports = router;