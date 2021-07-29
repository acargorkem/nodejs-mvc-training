const path = require("path");
const express = require("express");

const adminController = require("../controllers/admin");
const auth = require("../middleware/auth");
const validator = require("../middleware/validation");

const router = express.Router();

router.get("/add-product", auth.isAuth, adminController.getAddProduct);

router.post(
  "/add-product",
  validator.productRules(),
  validator.addProductCheck,
  auth.isAuth,
  adminController.postAddProduct
);

router.get("/products", auth.isAuth, adminController.getProducts);

router.get(
  "/edit-product/:productId",
  auth.isAuth,
  adminController.getEditProduct
);

router.post(
  "/edit-product",
  validator.productRules(),
  validator.addProductCheck,
  auth.isAuth,
  adminController.postEditProduct
);

router.post("/delete-product", auth.isAuth, adminController.postDeleteProduct);

module.exports = router;
