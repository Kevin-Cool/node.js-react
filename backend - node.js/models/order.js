const db = require("../config/db");

const Order = {
    fetchOrderByID: function (ID) {
        return new Promise((resolve, reject) => {
            const id  = parseInt(ID,10);
            db.query("SELECT * FROM productorder WHERE id = ?", [id], (err, order, fields) => {
                if (err) {
                    console.error("error:" + err);
                }
                resolve(order);
            })
        })
    },
    postOrder: function (values) {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO productorder SET ?", [values], (err, order, fields) => {
                if (err) {
                    console.error("error:" + err);
                }
                resolve(order);
            })
        })
    },
    fetchAllOrderbyUserid: (ID) =>{
        return new Promise((resolve,reject) => {
            const id  = parseInt(ID,10);
            db.query("SELECT * FROM productorder WHERE userid = ?",[id],(err,order,fields) => {
                if(err) reject(err);
                resolve(order);
            })
        })
    }
}
module.exports = Order;