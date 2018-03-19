var express = require('express');
var router = express.Router();
var mongo = require('../data_source/mongo');
var UserData = mongo.getUserData();

router.get('/get-user-all', function (req, res, next) {
    UserData.find()
        .then(function (doc) {
            if(doc){
                res.send(JSON.stringify(doc));
            }else {
                res.json({error: 'Server Error'});
            }
        })
});

router.get('/get-user-name', function (req, res, next) {
    UserData.find({ userName: req.query.userName})
        .then(function (doc) {
            if(doc){
                res.send(JSON.stringify(doc));
            }else {
                res.json({error: 'User not found'});
            }
        })
});

router.post('/add-user', function (req, res, next) {
    var user = {
        userName: req.body.userName,
        password: req.body.password,
        role: req.body.role,
        created: new Date()
    };
    var data = mongo.createUserData(user);
    data.save();
    res.json({message: 'User created successfully'});
});


module.exports = router;