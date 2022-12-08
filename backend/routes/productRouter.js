const express = require("express");
const router = express.Router();
const { productController } = require("../controller");

router.post("/create", productController.create);
router.get("/all", productController.getAllProducts);
router.get("/category/all", productController.getAllCategories);

module.exports = router;
