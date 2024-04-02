const User = require('../models/user')
const cloudinary = require('../cloudinary');

function getUser(req, res){
    userId = req.userInfo.userId;
    
    User.find({_id : userId})
    .then(result => {
        res.status(200).json(result[0])
    })
    .catch(err => res.status(500).json(err))

}

function addInfo(req,res){
    cloudinary.uploader.upload(req.file.path, function(err, result){
        if(err){
            console.log(err)
            return res.status(500).json(err)
        }
        url = result.url
        userId = req.userInfo.userId;

        User.updateOne({_id : userId}, {profile_pic : url})
        .then(result =>{
            console.log(result)
            res.status(200).json('success!')
        })
    })
}

module.exports = {
    getUser,
    addInfo
}