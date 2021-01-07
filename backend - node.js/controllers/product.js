const Product = require("../models/product")

exports.getAllProducts = (req,res) =>{
    Product.fetchAllProducts()
        .then(product => res.json(product))
        .catch(err => res.send(err))
}

exports.getProductByID = (req,res) =>{
    Product.fetchProductByID(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.send(err))
}