const mux = require("@mux/mux-node");
const { Video } = new mux(
  process.env.MUX_ACCESS_TOKEN_ID,
  process.env.MUX_SECRET_KEY
);
const { getAll, createOne, updateOne, getOne } = require("./factoryHandler");
const Course = require("../models/courseModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllCourses = getAll(Course);

exports.createCourse = createOne(Course);

exports.updateCourse = updateOne(Course);

exports.deleteCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }

  for (const chapter of course.chapters) {
    if (chapter.muxData?.assetId) {
      await Video.Assets.del(chapter.muxData.assetId);
    }
  }

  await Course.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getOneCourse = getOne(Course);
