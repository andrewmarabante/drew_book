const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    friends : {
        type : Array,
        required : true
    },
    profile_pic : {
        type : String,
    },
    bio : {
        type : String,
    },
    age : {
        type : Number,
    },
    occupation : {
        type : String,
    },
    gender : {
        type : String,
    },
    hobbies : {
        type : String,
    },
    school : {
        type : String
    }
})

const User = new mongoose.model('User', userSchema);

module.exports = User;