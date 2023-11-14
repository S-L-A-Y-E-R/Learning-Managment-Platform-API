const { createOne, getAll, deleteOne, getOne } = require("./factoryHandler");
const Attachment = require("../models/attachmentModel");

exports.createAttachment = createOne(Attachment);

exports.getAllAttachments = getAll(Attachment);

exports.deleteAttachment = deleteOne(Attachment);

exports.getOneAttachment = getOne(Attachment);
