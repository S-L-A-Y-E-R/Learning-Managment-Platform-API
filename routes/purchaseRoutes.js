const express = require("express");
const {
  updatePurchase,
  createPurchase,
  getPurchase,
  getAllPurchase,
} = require("../controllers/purchaseController");

const router = express.Router();

router.route("/").post(createPurchase).get(getAllPurchase);

router.route("/:id").get(getPurchase).patch(updatePurchase);

module.exports = router;
