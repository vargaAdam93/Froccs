var express = require('express');
var app = express();
var userRouter = express.Router();

var User = require('../Models/User');

userRouter.route('/login').post(
    function (req,res) {
        var email = req.body.email;
        var passwd = req.body.password;
        var query = User.where({ email: email, password : passwd});
        query.findOne(
            function (err,user) {
                if(err) return res.status(404).send('Not found');
                if(user)
                    return res.json(user);
            }
        )
    }
);
userRouter.route('/register').post(
    function (req,res) {
        var newUser = User();
        newUser.email = req.body.email;
        newUser.name = req.body.name;
        newUser.password = req.body.password;
        newUser.type = UserEnum.USER;
        var query = User.where({ email: req.body.email});
        query.findOne(
            function (err, user) {
                if(err) return res.status(404).send("error");
                if(user === null)
                {
                    newUser.save().then( newUser =>{
                        res.json('registered')
                    })
                        .catch( err => {res.status(400).send("Already registered");})
                }
            }
        )
    }
);

module.exports = userRouter;