const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "A progress must have a userId"],
  },
  chapterId: {
    type: mongoose.Schema.ObjectId,
    ref: "Chapter",
    required: [true, "A progress must have a chapterId"],
  },
  isCompleted: {
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

progressSchema.pre(/^findOneAndUpdate/, function (next) {
  this._update.updatedAt = Date.now();
  next();
});

const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;
