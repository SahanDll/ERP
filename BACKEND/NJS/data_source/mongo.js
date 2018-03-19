var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
    userName: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: Number, required: true},
    created: {type: Date, required: true}
}, {collection: 'userData'});

var UserData = mongoose.model('UserData', userDataSchema);

function getUserData() {
    return UserData;
}

function createUserData(user) {
    return new UserData(user);
}


module.exports.getUserData = getUserData;
module.exports.createUserData = createUserData;