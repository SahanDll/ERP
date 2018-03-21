var mongo = require('../mongo');

var Schema = mongo.getSchema();

var userDataSchema = new Schema({
    userName: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: Number, required: true},
    created: {type: Date, required: true}
}, {collection: 'userData'});

var UserData = mongo.getMongoose().model('UserData', userDataSchema);

function getUserData() {
    return UserData;
}

function createUserData(user) {
    return new UserData(user);
}


module.exports.getUserData = getUserData;
module.exports.createUserData = createUserData;