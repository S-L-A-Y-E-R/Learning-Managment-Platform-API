const express = require("express");
const {
  getAllAttachments,
  createAttachment,
  deleteAttachment,
  getOneAttachment,
} = require("../controllers/attachmentController");

const router = express.Router();

router.route("/").get(getAllAttachments).post(createAttachment);

router.route("/:id").get(getOneAttachment).delete(deleteAttachment);

module.exports = router;
