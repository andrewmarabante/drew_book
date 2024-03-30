const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chat_id : {
        type : String,
        required : true
    },
    sender : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    }
    
}, {timestamps: true})

const Message = new mongoose.model('Message', messageSchema);

module.exports = Message;