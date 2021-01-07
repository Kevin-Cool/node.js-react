const bcrypt = require("bcrypt")
const User = require("../models/user")

exports.postUser = (req,res) =>{
    const saltRounds = 10;
    bcrypt.hash(req.body["wachtwoord"],saltRounds)
        .then((hash) =>{
            req.body["wachtwoord"] = hash;
            User.postUser(req.body)
                .then(users => res.json(users))
                .catch(err => res.send(err))
    });
}
exports.loginUser = (req,res) =>{
    console.log(req.body["email"]);
    console.log(req.body["paswoord"]);
    User.getUserByEmail(req.body["email"])
        .then(users => {
                bcrypt.compare(req.body["wachtwoord"], users[0]["wachtwoord"])
                    .then((result) => {
                        if(result){
                            return res.send(users[0]);
                        }else{

                            return res.status(403).send();
                        }
                    }).catch(err => res.send(err))
        })
        .catch(err => res.send(err))
}