const { getOne, updateOne, getAll } = require("./factoryHandler");
const Progress = require("../models/progressModel");
const catchAsync = require("../utils/catchAsync");

exports.createOrUpdateProgerss = catchAsync(async (req, res, next) => {
  const progress = await Progress.findOne({
    userId: req.body.userId,
    chapterId: req.body.chapterId,
  });

  if (!progress) {
    const newProgress = await Progress.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: newProgress,
      },
    });
  } else {
    progress.isCompleted = req.body.isCompleted;
    progress.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
      data: {
        data: progress,
      },
    });
  }
});

exports.getProgress = getOne(Progress);

exports.getAllProgress = getAll(Progress);

exports.updateProgress = updateOne(Progress);
