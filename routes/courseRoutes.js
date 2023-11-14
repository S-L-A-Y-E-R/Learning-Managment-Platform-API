const express = require("express");
const {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getOneCourse,
} = require("../controllers/courseController");

const router = express.Router();

router.route("/").get(getAllCourses).post(createCourse);

router.route("/:id").get(getOneCourse).patch(updateCourse).delete(deleteCourse);

module.exports = router;
