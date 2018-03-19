var express = require('express');
var router = express.Router();
var mongo = require('../data_source/mongo');
var jwt = require('jsonwebtoken');
var config = require('../config');

router.post('/authenticate', function (req, res) {
    var UserData = mongo.getUserData();

    UserData.find({userName: req.body.userName})
        .then(function (doc) {
            if (doc) {
                if (doc[0].password !== req.body.password) {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                } else {
                    const payload = {
                        userName: doc.userName,
                        role: doc.role
                    };
                    var token = jwt.sign(payload, config.secret, {
                        expiresIn: 60 * 60
                        /*expiresIn : 60*60*24*/
                    });
                    res.json({
                        success: true,
                        message: 'Authentication success.',
                        token: token,
                        expires: 60 * 60
                    });
                }

            } else {
                res.json({success: false, message: 'Authentication failed ' + err});
            }

        });

});


module.exports = router;