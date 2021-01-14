var express = require('express');
var router = express.Router();
const OrderController = require("../controllers/order")

const {check} = require("express-validator")


router.get('/:id', OrderController.getOrderByID);

router.get('/user/:id', OrderController.getOrderByuserID);

router.post('/',check("created").isDate()
        ,check("street").isLength({min:1})
        ,check("number").isLength({min:1})
        ,check("postCode").isLength({min:1})
        ,check("city").isLength({min:1})
        ,check("postCode").isLength({min:1})
        ,OrderController.postOrder);

module.exports = router;
