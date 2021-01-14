const db = require("../config/db");

const User = {
    fetchAllUsers: () =>{
        return new Promise((resolve,reject) => {
            db.query("SELECT * FROM users",(err,users,fields) => {
                if(err) reject(err);
                resolve(users);
            })
        })
    },

    fetchUserByID: function (ID) {
        return new Promise((resolve,reject) => {
            const id = ID;
            db.query("SELECT * FROM users WHERE id = ?",[id],(err,users,fields) => {
                if(err) {
                    console.error("error:"+err);
                }
                resolve(users);
            })
        })
    },

    postUser: function (values) {
        return new Promise((resolve,reject) => {
            db.query("INSERT INTO users SET ?",[values],(err,users,fields) => {
                if(err) {
                    console.error("error:"+err);
                }
                resolve(users);
            })
        })
    },
    getUserByEmail: function (email) {
        return new Promise((resolve,reject) => {
            db.query("SELECT * FROM users WHERE email = ?",[email],(err,users,fields) => {
                if(err) {
                    console.error("error:"+err);
                }
                resolve(users);
            })
        })
    }
}
module.exports = User;