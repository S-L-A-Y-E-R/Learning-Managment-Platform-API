const { createOne, getOne, updateOne, getAll } = require("./factoryHandler");
const Purchase = require("../models/purchaseModel");

exports.createPurchase = createOne(Purchase);

exports.getPurchase = getOne(Purchase);

exports.getAllPurchase = getAll(Purchase);

exports.updatePurchase = updateOne(Purchase);
