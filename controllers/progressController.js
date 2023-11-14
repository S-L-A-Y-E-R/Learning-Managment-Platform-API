const { createOne, getOne, updateOne } = require("./factoryHandler");
const Progress = require("../models/progressModel");

exports.createProgerss = createOne(Progress);

exports.getProgress = getOne(Progress);

exports.updateProgress = updateOne(Progress);
