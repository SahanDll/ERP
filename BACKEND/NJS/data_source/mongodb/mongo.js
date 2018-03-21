var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {
    "auth": { "authSource": "admin" },
    "user": "root",
    "pass": "password"
});

var Schema = mongoose.Schema;

function getSchema() {
    return Schema;
}

function getMongoose() {
    return mongoose;
}

module.exports.getSchema = getSchema;
module.exports.getMongoose = getMongoose;