const db = require("../config/db");

const Product = {
    fetchAllProducts: () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM product", (err, users, fields) => {
                if (err) reject(err);
                resolve(users);
            })
        })
    },

    fetchProductByID: function (ID) {
        return new Promise((resolve, reject) => {
            const id = ID;
            db.query("SELECT * FROM product WHERE id = ?", [id], (err, users, fields) => {
                if (err) {
                    console.error("error:" + err);
                }
                resolve(users);
            })
        })
    }
}

module.exports = Product;