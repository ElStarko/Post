const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: {type: String,  required: true},
    lastName : {type: String,  required: true},
    email: {type: String,  required: true},
    password : {type: String, required: true, select: false },
    avatarUrl: {type: String },
    role: {type: String, default: "user"},
    deleted: { type: Boolean, default: false },
    createdDate : { type: Date, default: new Date()}
})

module.exports = mongoose.model('User', UserSchema)