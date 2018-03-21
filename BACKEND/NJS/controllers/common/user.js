var express = require('express');
var router = express.Router();
var userData = require('../../data_source/mongodb/schema/userData');

router.get('/get-user-all', function (req, res, next) {
    userData.getUserData().find()
        .then(function (doc) {
            if(doc){
                res.send(JSON.stringify(doc));
            }else {
                res.json({error: 'Server Error'});
            }
        })
        .catch(function(err){
            res.json({error: err});
        });
});

router.get('/get-user-name', function (req, res, next) {
    userData.getUserData().find({ userName: req.query.userName})
        .then(function (doc) {
            if(doc){
                res.send(JSON.stringify(doc));
            }else {
                res.json({error: 'User not found'});
            }
        })
        .catch(function(err){
            res.json({error: err});
        });
});

router.post('/add-user', function (req, res, next) {
    var user = {
        userName: req.body.userName,
        password: req.body.password,
        role: req.body.role,
        created: new Date()
    };
    var data = userData.getUserData().createUserData(user);
    data.save(function(err) {
        if (err) {
            res.json(500, {message: 'User create failed'});
        } else {
            res.json(200, {message: 'User create success'});
        }
    });
});


module.exports = router;