const { createOne, getOne, updateOne, getAll } = require("./factoryHandler");
const Progress = require("../models/progressModel");

exports.createProgerss = createOne(Progress);

exports.getProgress = getOne(Progress);

exports.getAllProgress = getAll(Progress);

exports.updateProgress = updateOne(Progress);
