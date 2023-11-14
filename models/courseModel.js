const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "A course must belong to a user"],
  },
  title: {
    type: String,
    required: [true, "A course must have a title"],
    trim: true,
    maxlength: [
      30,
      "A course title must have less or equal then 40 characters",
    ],
  },
  description: {
    type: String,
    required: [true, "A course must have a description"],
    trim: true,
    maxlength: [
      200,
      "A course description must have less or equal then 200 characters",
    ],
  },
  imageUrl: {
    type: String,
    required: [true, "A course must have an image"],
  },
  price: {
    type: Number,
    required: [true, "A course must have a price"],
  },
  purchases: [String],
  isPublished: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    required: [true, "A course must have a category"],
    enum: [
      "Computer Science",
      "Music",
      "Fitness",
      "Photography",
      "Accounting",
      "Engineering",
      "Filming",
    ],
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

courseSchema.pre(/^findOneAndUpdate/, function (next) {
  this._update.updatedAt = Date.now();
  next();
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
