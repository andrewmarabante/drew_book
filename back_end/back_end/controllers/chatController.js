const User = require('../models/user');
const Chat = require('../models/chat');

function getChats(req, res){

    userId = req.userInfo.userId;

    User.find({_id : userId})
    .then(result => {
        user = result[0];
        userFriendList = user.friends;
        console.log(userFriendList)

    User.find({_id : {$in: userFriendList}})
    .then(result => {
        friendList = result;

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

module.exports = {
    getChats,
    newChat
}