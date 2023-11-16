const express = require("express");
const {
  updateProgress,
  createOrUpdateProgerss,
  getProgress,
  getAllProgress,
} = require("../controllers/progressController");

const router = express.Router();

router.route("/").post(createOrUpdateProgerss).get(getAllProgress);

router.route("/:id").get(getProgress).patch(updateProgress);

module.exports = router;
