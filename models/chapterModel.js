const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: [true, "A chapter must belong to a course"],
  },
  title: {
    type: String,
    required: [true, "A chapter must have a title"],
    trim: true,
    maxlength: [
      20,
      "A chapter title must have less or equal then 40 characters",
    ],
  },
  description: {
    type: String,
    required: [true, "A chapter must have a description"],
    trim: true,
    maxlength: [
      200,
      "A chapter description must have less or equal then 200 characters",
    ],
  },
  videoUrl: {
    type: String,
    required: [true, "A chapter must have a video"],
  },
  position: {
    type: Number,
    required: [true, "A chapter must have a position"],
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  isFree: {
    type: Boolean,
    default: false,
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

chapterSchema.pre(/^findOneAndUpdate/, function (next) {
  this._update.updatedAt = Date.now();
  next();
});

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;
