const express = require("express");
const {
  updateProgress,
  createProgerss,
  getProgress,
} = require("../controllers/progressController");

const router = express.Router();

router.route("/").post(createProgerss);

router.route("/:id").get(getProgress).patch(updateProgress);

module.exports = router;
