const Post = require('../models/post');
const User = require('../models/user')

function getPosts(req, res){
    user = req.userInfo.userId
    
    Post.find({owner : user})
    .then(result => {
        const userPosts = result
        User.find({_id : user})
        .then(result => {
            const userInfo = result[0];
            Post.find({owner : {$in : userInfo.friends}})
            .then(result => {
                const friendPosts = result;
                User.find({_id: {$in: userInfo.friends}})
                .then(result=>{
                friendList = result
                friendList.push(userInfo)
                res.json({userPosts : userPosts, friendsPosts : friendPosts, friendList: friendList})})
            })
        })

    })
    .catch(err => res.status(500).json(err))
}

function createPost(req,res){
    console.log(req.body)
    console.log(req.userInfo.userId)
    postDetails = {
        owner : req.userInfo.userId,
        title : req.body.title,
        body : req.body.body,
        comments : [],
        likes : []
    }

    const newPost = new Post(postDetails);

    newPost.save()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err))

}

module.exports = {
    getPosts,
    createPost
}