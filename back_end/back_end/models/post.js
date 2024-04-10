const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    owner : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    images : {
        type : Array,
    },
    comments : {
        type : Array,
    },
    likes : {
        type : Array,
    },
    dislikes : {
        type : Array,
    }
    
    
}, {timestamps: true})

const Post = new mongoose.model('Post', postSchema);

module.exports = Post;