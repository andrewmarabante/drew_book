const User = require('../models/user');
const Chat = require('../models/chat');

function getChats(req, res){

    user = req.userInfo;
    userId = req.userInfo.userId;

    User.find({_id : userId})
    .then(result => {
        user = result[0];
        userFriendList = user.friends;

    User.find({_id : {$in: userFriendList}})
    .then(result => {
        friendList = result;
        friendList.push(user)

        Chat.find({users : userId})
        .then(result => {
            chatList= result;
            res.status(200).json({friendList : friendList, chatList : chatList})
        })
    })
        

    })
    .catch(err => res.status(500).json(err))

}

function newChat(req,res){

    chat_name = req.body.chatName

    userId = req.userInfo.userId
    users = req.body.users
    users.push(userId)

    chatDetails = {
        chat_name : chat_name,
        users : users,
        messages : []
    }

    const newChat = new Chat(chatDetails);

    newChat.save()
    .then(
        res.status(200).json('saved')
    )
    .catch(err => res.status(500).json(err))
}

function newMessage(req, res){
    chatId = req.body.chatId
    console.log(req.body.id)
    newMessage = {
        message: req.body.message,
        sender : req.body.sender,
        id : req.body.id
    }

    Chat.updateOne({_id : chatId}, {$push : {messages : newMessage}})
    .then(res.status(200).json('Message Saved'))
    .catch(err => res.status(500).json(err))
}

function deleteMessage(req, res){
    messageId = req.body.messageId;
    
    Chat.find({messages : {$elemMatch : {id: messageId}}})
    .then(result => {
        chatId = result[0]._id;
        
        Chat.updateOne({_id: chatId}, {$pull : {messages : {id : messageId}}})
        .then(res.status(200).json('done'))
    })
    .catch(err => res.status(500).json(err))

}

module.exports = {
    getChats,
    newChat,
    newMessage,
    deleteMessage
}