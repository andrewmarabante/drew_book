const User = require('../models/user')
const cloudinary = require('../cloudinary');

function getUser(req, res){

    specifiedUser = req.params.id;

    if(specifiedUser){
        specifiedUser = specifiedUser.slice(1);
        userId = specifiedUser
    }else{
        userId = req.userInfo.userId;
    }
    User.find({_id : userId})
    .then(result => {
        res.status(200).json(result[0])
    })
    .catch(err => res.status(500).json(err))

}

function addInfo(req,res){

    left = ',x_'+req.body.left;
    top = ',y_'+req.body.top;
    height = ',h_'+req.body.height;
    width = ',w_'+req.body.width;

    transformations = 'c_crop'+height+width+left+top + '/';


    cloudinary.uploader.upload(req.file.path, function(err, result){
        if(err){
            console.log(err)
            return res.status(500).json(err)
        }
        url = result.url
        splitURL = url.split('upload/')
        origin = splitURL[0]+'upload/'
        image = splitURL[1]

        profilePicURL = origin + transformations + image

        userId = req.userInfo.userId;


        User.updateOne({_id : userId}, {profile_pic : profilePicURL})
        .then(result =>{
            res.status(200).json('success!')
        })
    })
}

function getSuggested(req,res){
    userId = req.userInfo.userId;
    User.find({_id : userId})
    .then(result => {
        friends = result[0].friends;
        //to stop the user from being in friends list
        friends.push(userId);

        User.find({_id : {$nin : friends}})
        .then(result => {
            res.status(200).json(result);
        })
    })
    .catch(err => res.status(500).json(err));
}

function addFriend(req, res){

    newFriendId = req.body.id;
    userId = req.userInfo.userId;

    User.find({_id : userId})
    .then(result => {
        let user = result[0]
        friends = user.friends
        friends.push(newFriendId);

        User.updateOne({_id : userId} , {friends : friends})
        .then(res.status(200).json('added'))
    })
    .catch(err => res.status(500).json(err)) 
}

function removeFriend(req, res){

    removeFriendId = req.body.id;
    userId = req.userInfo.userId;

    User.find({_id : userId})
    .then(result => {
        let user = result[0]
        friends = user.friends
        index = friends.indexOf(removeFriendId)
        friends.splice(index,1)

        User.updateOne({_id : userId} , {friends : friends})
        .then(res.status(200).json('removed'))
    })
    .catch(err => res.status(500).json(err))
}

function getFriends(req, res){

    if(req.params.id === ':null'){
        userId = req.userInfo.userId;
    }else{
        userId = req.params.id.slice(1)
    }

    User.find({_id : userId})
    .then(result => {
        
        friends = result[0].friends

        User.find({_id : {$in : friends}})
        .then(result => {
            res.status(200).json(result)
        })
    })
    .catch(err => json.status(500).json(err))
}

function updateInfo(req, res){
    info = req.body
    userId = req.userInfo.userId

    User.updateOne({_id : userId}, info)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => res.status(500).json(err))
}

function updateBio(req,res){
    bio = req.body.bio;
    console.log(bio)
    userId = req.userInfo.userId;

    User.updateOne({_id : userId}, {bio: bio})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err))

}

module.exports = {
    getUser,
    addInfo,
    getSuggested,
    addFriend,
    removeFriend,
    getFriends,
    updateInfo,
    updateBio
}