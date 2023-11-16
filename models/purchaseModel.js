const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "A purchase must have a userId"],
    },
    courseId: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
      required: [true, "A purchase must have a courseId"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

purchaseSchema.pre(/^findOneAndUpdate/, function (next) {
  this._update.updatedAt = Date.now();
  next();
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
