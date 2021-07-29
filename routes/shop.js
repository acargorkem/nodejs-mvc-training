const path = require("path");
const express = require("express");
const router = express.Router();

const rootDir = require("../util/path");

const adminData = require("./admin");

const shopController = require("../controllers/shop");
const auth = require("../middleware/auth");
const { route } = require("./admin");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", auth.isAuth, shopController.getCart);

router.post("/cart", auth.isAuth, shopController.postCart);

router.post("/cart-delete-item", auth.isAuth, shopController.postCartDeleteProduct);

router.get("/orders", auth.isAuth, shopController.getOrders);

router.post("/create-order", auth.isAuth, shopController.postOrder);

module.exports = router;
