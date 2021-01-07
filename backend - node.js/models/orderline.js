const db = require("../config/db");

const OrderLine = {
    fetchOrderLinesByOrderID: function (ID) {
        return new Promise((resolve, reject) => {
            const id = ID;
            db.query("SELECT orderline.id as id, orderline.quantity as quantity, orderline.price as price, product.id as productid, product.name as name FROM orderline JOIN product ON orderline.productid = product.id WHERE orderid = ?", [id], (err, users, fields) => {
                if (err) {
                    console.error("error:" + err);
                }
                resolve(users);
            })
        })
    },
    postOrderLine: function (values) {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO orderline SET ?", [values], (err, users, fields) => {
                if (err) {
                    console.error("error:" + err);
                }
                resolve(users);
            })
        })
    },
}
module.exports = OrderLine;