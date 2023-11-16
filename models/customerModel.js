const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Customer must have a user ID"],
  },
  stripeCustomerId: {
    type: String,
    required: [true, "Customer must have a stripe customer ID"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

customerSchema.pre(/^findOneAndUpdate/, function (next) {
  this._update.updatedAt = Date.now();
  next();
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
