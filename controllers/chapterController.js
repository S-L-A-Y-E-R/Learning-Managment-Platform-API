const {
  getAll,
  createOne,
  updateOne,
  deleteOne,
  getOne,
} = require("./factoryHandler");
const Chapter = require("../models/chapterModel");

exports.getAllChapters = getAll(Chapter);

exports.createChapter = createOne(Chapter);

exports.updateChapter = updateOne(Chapter);

exports.deleteChapter = deleteOne(Chapter);

exports.getOneChapter = getOne(Chapter);
