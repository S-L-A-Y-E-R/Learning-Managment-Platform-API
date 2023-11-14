const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
      required: [true, "A chapter must have a courseId"],
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
      trim: true,
      maxlength: [
        200,
        "A chapter description must have less or equal then 200 characters",
      ],
    },
    videoUrl: {
      type: String,
    },
    position: {
      type: Number,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

chapterSchema.pre(/^findOneAndUpdate/, function (next) {
  this._update.updatedAt = Date.now();
  next();
});

chapterSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    const lastChapter = await this.constructor
      .findOne({ courseId: this.courseId })
      .sort({ position: -1 })
      .select("position");

    this.position = lastChapter ? lastChapter.position + 1 : 1;

    next();
  } catch (error) {
    next(error);
  }
});

chapterSchema.virtual("muxData", {
  ref: "Mux",
  foreignField: "chapterId",
  localField: "_id",
});

chapterSchema.pre(/^find/, function (next) {
  this.populate({
    path: "muxData",
    select: "assetId playbackId",
  });
  next();
});

chapterSchema.virtual("UserProgress", {
  ref: "Progress",
  foreignField: "chapterId",
  localField: "_id",
});

chapterSchema.pre(/^find/, function (next) {
  this.populate({
    path: "UserProgress",
    select: "isCompleted userId",
  });
  next();
});

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;
