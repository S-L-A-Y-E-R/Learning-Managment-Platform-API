const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

courseSchema.pre(/^findOneAndUpdate/, function (next) {
  this._update.updatedAt = Date.now();
  next();
});

courseSchema.virtual("chapters", {
  ref: "Chapter",
  foreignField: "courseId",
  localField: "_id",
  match: { isPublished: true },
  options: { sort: { position: 1 } },
});

courseSchema.virtual("attachments", {
  ref: "Attachment",
  foreignField: "courseId",
  localField: "_id",
});

courseSchema.virtual("purchases", {
  ref: "Purchase",
  foreignField: "courseId",
  localField: "_id",
});

courseSchema.pre(/^find/, function (next) {
  this.populate({
    path: "chapters",
    select: "title description videoUrl position isPublished isFree",
  });
  next();
});

courseSchema.pre(/^find/, function (next) {
  this.populate({
    path: "attachments",
    select: "name url",
  });
  next();
});

courseSchema.pre(/^find/, function (next) {
  this.populate({
    path: "purchases",
  });
  next();
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
