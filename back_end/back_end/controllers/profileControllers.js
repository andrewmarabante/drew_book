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

        console.log(profilePicURL)

        User.updateOne({_id : userId}, {profile_pic : profilePicURL})
        .then(result =>{
            res.status(200).json('success!')
        })
    })
}

module.exports = {
    getUser,
    addInfo
}