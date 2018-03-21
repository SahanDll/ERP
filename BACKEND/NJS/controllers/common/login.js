var express = require('express');
var router = express.Router();
var userData = require('../../data_source/mongodb/schema/userData');
var jwt = require('jsonwebtoken');
var config = require('../../config');

router.post('/authenticate', function (req, res) {
    //Content-Type   application/x-www-form-urlencoded
    //Rest client Request parameters
    userData.getUserData().find({userName: req.body.userName})
        .then(function (doc) {
            if (doc[0]) {
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
                res.json({success: false, message: 'Authentication failed '});
            }
        })
        .catch(function(err){
            res.json({success: false, message: err});
        });
});


module.exports = router;