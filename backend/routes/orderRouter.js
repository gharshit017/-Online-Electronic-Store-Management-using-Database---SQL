const express = require("express");
const router = express.Router();
const { orderController } = require("../controller");

router.post("/create", orderController.create);

module.exports = router;
