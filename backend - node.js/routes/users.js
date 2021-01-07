var express = require('express');
var router = express.Router();
const UserController = require("../controllers/user")

const {check} = require("express-validator")


router.post('/',check("voornaam").isLength({min:3})
                    ,check("achternaam").isLength({min:3})
                    ,check("wachtwoord").isLength({min:3}).trim().escape()
                    ,check("email").isEmail().normalizeEmail()
                    ,UserController.postUser);

router.post('/login',check("email").isEmail().normalizeEmail(), UserController.loginUser);

module.exports = router;
