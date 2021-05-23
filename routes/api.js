var express = require("express");
var router = express.Router();
const Book = require("../models/Book");
const apiController = require("../controllers/api");

/* GET Product list. */
router.get("/products", apiController.getProducts);
/* GET product detail. */
router.get("/products/:id", apiController.getProductsById);
router.post("/login", apiController.postApiLogin);
router.post("/register", apiController.postApiRegister);

module.exports = router;
