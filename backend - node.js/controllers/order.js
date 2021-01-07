const Order = require("../models/order")
const OrderLine = require("../models/orderline")
const Product = require("../models/product")

exports.getOrderByID = (req,res) =>{
    Order.fetchOrderByID(req.params.id)
        .then(order => {
            OrderLine.fetchOrderLinesByOrderID(order[0].id)
                .then(orderline => {
                    order[0].products = orderline
                    res.json(order)
                })
                .catch(err => res.send(err))
        })
        .catch(err => res.send(err))
}
exports.postOrder = (req,res) =>{
    let order = req.body
    order.totalPrice = 0.00
    let orderline = []
    orderline = req.body.products
    delete order.products
    //get price for order
    const promises = []
    orderline.forEach(function myFunction(item, index) {
        promises.push(Product.fetchProductByID(item.productid)
            .then(product => {
                let tempproduct = product[0]
                item.price = tempproduct.price * item.quantity
                order.totalPrice += item.price
            })
            .catch(err => console.log(err)))
    })

    Promise.all(promises)
        .then(r => {
            console.log("order")
            console.log(order)
            console.log("orderline")
            console.log(orderline)
            // post order
            Order.postOrder(order)
                .then(neworder => {
                    orderline.forEach(function myFunction(item, index) {
                        item.orderid = neworder.insertId
                        //post orderlists
                        promises.push(OrderLine.postOrderLine(item)
                            .then(neworderline => {/* nothing */})
                            .catch(err => res.send(err)))
                    });
                    Promise.all(promises)
                        .then(r => {
                            res.json(neworder.insertId)
                        })

                })
                .catch(err => res.send(err))

        })
}
exports.getOrderByuserID = (req,res) =>{
    Order.fetchAllOrderbyUserid(req.params.id)
        .then(orders => {
            const promises = []
            orders.forEach(function myFunction(item, index) {
                promises.push(OrderLine.fetchOrderLinesByOrderID(item.id)
                    .then(orderline => {
                        item.products = orderline
                    })
                    .catch(err => res.send(err)))
            })

            Promise.all(promises)
                .then(r => {
                    res.json(orders)
                })

        })
        .catch(err => res.send(err))
}
/* Order.fetchOrderByID(req.params.id)
        .then(order => {
            OrderLine.fetchOrderLinesByOrderID(order[0].id)
                .then(orderline => {
                    order[0].products = orderline
                    res.json(order)
                })
                .catch(err => res.send(err))
        })
        .catch(err => res.send(err))*/

