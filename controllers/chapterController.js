const mux = require("@mux/mux-node");
const { Video } = new mux(
  process.env.MUX_ACCESS_TOKEN_ID,
  process.env.MUX_SECRET_KEY
);
const { getAll, createOne, deleteOne, getOne } = require("./factoryHandler");
const Chapter = require("../models/chapterModel");
const Mux = require("../models/muxModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllChapters = getAll(Chapter);

exports.createChapter = createOne(Chapter);

exports.getOneChapter = getOne(Chapter);

exports.updateChapter = catchAsync(async (req, res, next) => {
  const updatedChapter = await Chapter.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  const existingMuxData = await Mux.findOne({ chapterId: req.params.id });

  if (existingMuxData) {
    await Video.Assets.del(existingMuxData.assetId);
    await Mux.findByIdAndDelete(existingMuxData._id);
  }

  const asset = await Video.Assets.create({
    input: req.body.videoUrl,
    playback_policy: "public",
    test: false,
  });

  await Mux.create({
    assetId: asset.data.id,
    playbackId: asset.data.playback_ids[0].id,
    chapterId: req.params.id,
  });

  res.status(200).json({
    status: "success",
    data: {
      data: updatedChapter,
    },
  });
});

exports.deleteChapter = catchAsync(async (req, res, next) => {
  const existingMuxData = await Mux.findOne({ chapterId: req.params.id });

  if (existingMuxData) {
    await Video.Assets.del(existingMuxData.assetId);
    await Mux.findByIdAndDelete(existingMuxData._id);
  }

  await Chapter.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.reorderChapters = catchAsync(async (req, res, next) => {
  const { chapters } = req.body;

  for (const chapter of chapters) {
    await Chapter.findByIdAndUpdate(chapter._id, {
      position: chapter.position,
    });
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
