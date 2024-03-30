const Post = require('../models/post');

function getPosts(req, res){
    console.log('working')
    res.json()
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