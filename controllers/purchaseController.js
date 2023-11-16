const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { createOne, getOne, updateOne, getAll } = require("./factoryHandler");
const Purchase = require("../models/purchaseModel");
const Course = require("../models/courseModel");
const Customer = require("../models/customerModel");
const catchAsync = require("../utils/catchAsync");

exports.createPurchase = createOne(Purchase);

exports.getPurchase = getOne(Purchase);

exports.getAllPurchase = getAll(Purchase);

exports.updatePurchase = updateOne(Purchase);

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.body.courseId);
  const purchase = await Purchase.findOne({
    courseId: req.body.courseId,
    userId: req.body.userId,
  });

  if (purchase) {
    return next(new AppError("You have already purchased this course", 400));
  }

  if (!course) {
    return next(new AppError("No course found with this id", 404));
  }

  const line_items = [
    {
      quantity: 1,
      price_data: {
        currency: "usd",
        product_data: {
          name: course.title,
          description: course.description,
        },
        unit_amount: Math.round(course.price * 100),
      },
    },
  ];

  let stripeCustomer = await Customer.findOne({ userId: req.body.userId });

  if (!stripeCustomer) {
    const customer = await stripe.customers.create({
      email: req.body.email,
    });
    stripeCustomer = await Customer.create({
      userId: req.body.userId,
      stripeCustomerId: customer.id,
    });
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomer.stripeCustomerId,
    line_items,
    mode: "payment",
    success_url: `${process.env.FRONTEND_HOST}/courses/${course.id}?success=1`,
    cancel_url: `${process.env.FRONTEND_HOST}/courses/${course.id}?canceled=1`,
    metadata: {
      courseId: course.id,
      userId: req.body.userId,
    },
  });
  res.status(200).json({
    status: "success",
    session,
  });
});

exports.webhookCheckout = catchAsync(async (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  /*We need the signature and the secret to validate 
    the data in the body and make the process super secure*/
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(err);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  const session = event.data.object;
  const userId = session.metadata.userId;
  const courseId = session.metadata.courseId;

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      return res.status(400).send(`Webhook error: ${err.message}`);
    }
    console.log(courseId, userId, session);
    await Purchase.create({
      courseId,
      userId,
    });

    res.status(200).json({
      recieved: true,
    });
  } else {
    res.status(400).json({
      recieved: false,
    });
  }
});
