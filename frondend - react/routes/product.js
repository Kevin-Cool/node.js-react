var express = require('express');
var router = express.Router();
const ProductController = require("../controllers/product")

const {check} = require("express-validator")

router.get('/', ProductController.getAllProducts);

router.get('/:id', ProductController.getProductByID);

module.exports = router;
