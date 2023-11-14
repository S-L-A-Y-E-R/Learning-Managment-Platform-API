const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An attachment must have a name"],
    trim: true,
  },
  url: {
    type: String,
    required: [true, "An attachment must have a url"],
    trim: true,
  },
  courseId: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: [true, "An attachment must have a courseId"],
  },
});

const Attachment = mongoose.model("Attachment", attachmentSchema);

module.exports = Attachment;
