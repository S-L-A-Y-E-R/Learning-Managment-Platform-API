const mongoose = require("mongoose");

const muxModel = new mongoose.Schema({
  assetId: {
    type: String,
    required: [true, "A mux must have an assetId"],
  },
  playbackId: {
    type: String,
    required: [true, "A mux must have a playbackId"],
  },
  chapterId: {
    type: mongoose.Schema.ObjectId,
    ref: "Chapter",
    required: [true, "A mux must have a chapterId"],
  },
});

const Mux = mongoose.model("Mux", muxModel);

module.exports = Mux;
