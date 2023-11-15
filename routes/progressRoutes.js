const express = require("express");
const {
  updateProgress,
  createProgerss,
  getProgress,
  getAllProgress,
} = require("../controllers/progressController");

const router = express.Router();

router.route("/").post(createProgerss).get(getAllProgress);

router.route("/:id").get(getProgress).patch(updateProgress);

module.exports = router;
