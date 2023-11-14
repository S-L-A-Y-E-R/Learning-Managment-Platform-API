const {
  getAll,
  createOne,
  updateOne,
  deleteOne,
  getOne,
} = require("./factoryHandler");
const Course = require("../models/courseModel");

exports.getAllCourses = getAll(Course);

exports.createCourse = createOne(Course);

exports.updateCourse = updateOne(Course);

exports.deleteCourse = deleteOne(Course);

exports.getOneCourse = getOne(Course);
