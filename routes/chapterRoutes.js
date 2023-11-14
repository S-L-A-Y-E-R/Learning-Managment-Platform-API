const express = require("express");
const {
  getAllChapters,
  createChapter,
  updateChapter,
  deleteChapter,
  getOneChapter,
  reorderChapters,
} = require("../controllers/chapterController");

const router = express.Router();

router.route("/reorder").patch(reorderChapters);

router.route("/").get(getAllChapters).post(createChapter);

router
  .route("/:id")
  .get(getOneChapter)
  .patch(updateChapter)
  .delete(deleteChapter);

module.exports = router;
