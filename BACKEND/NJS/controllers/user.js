var express = require('express');
var router = express.Router();
var mongo = require('../data_source/mongo');

router.get('/get-user-all', function (req, res, next) {
    var UserData = mongo.getUserData();

    UserData.find()
        .then(function (err, doc) {
            if(err){
                res.send(JSON.stringify(err));
            }else {
                res.send(JSON.stringify(doc));
            }
        })
});

router.get('/get-user-name', function (req, res, next) {
    var UserData = mongo.getUserData();

    UserData.find({ userName: req.query.userName})
        .then(function (err, doc) {
            if(err){
                res.send(JSON.stringify(err));
            }else {
                res.send(JSON.stringify(doc));
            }
        })
});

router.post('/add-user', function (req, res, next) {
    console.log("1")
    var user = {
        userName: req.body.userName,
        password: req.body.password,
        role: req.body.role,
        created: new Date()
    };
    console.log("2")
    var data = mongo.createUserData(user);
    console.log("3")
    data.save();
    console.log(data)
    res.send(JSON.stringify(data));
});


module.exports = router;