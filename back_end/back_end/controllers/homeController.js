const Post = require('../models/post');
const User = require('../models/user');
const cloudinary = require('../cloudinary');

function getPosts(req, res) {
    user = req.userInfo.userId

    Post.find({ owner: user })
        .then(result => {
            const userPosts = result
            User.find({ _id: user })
                .then(result => {
                    const userInfo = result[0];
                    Post.find({ owner: { $in: userInfo.friends } })
                        .then(result => {
                            const friendPosts = result;
                            User.find({ _id: { $in: userInfo.friends } })
                                .then(result => {
                                    friendList = result
                                    friendList.push(userInfo)
                                    res.json({ userPosts: userPosts, friendsPosts: friendPosts, friendList: friendList })
                                })
                        })
                })

        })
        .catch(err => res.status(500).json(err))
}

function createPost(req, res) {

    let imageURLs = []

    if (req.files.length !== 0) {
        req.files.forEach(file => {
            cloudinary.uploader.upload(file.path, function (err, result) {
                if (err) {
                    console.log(err)
                    return res.status(500).json(err)
                } else {
                    url = result.url
                    imageURLs.push(url)

                    if(imageURLs.length === req.files.length){

                        console.log(imageURLs)
                        postDetails = {
                            owner: req.userInfo.userId,
                            title: req.body.title,
                            images: imageURLs,
                            body: req.body.description,
                            comments: [],
                            likes: [],
                            dislikes: []
                        }


                        const newPost = new Post(postDetails);

                        newPost.save()
                            .then(result => res.status(200).json(result))
                            .catch(err => res.status(500).json(err))
                    }
                }
            })
        })
    }else{
        postDetails = {
            owner: req.userInfo.userId,
            title: req.body.title,
            images: [],
            body: req.body.description,
            comments: [],
            likes: []
        }

        const newPost = new Post(postDetails);

        newPost.save()
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json(err))
    }
}

function addComment(req,res){

    postId = req.body.postId;
    body = req.body.comment;
    userId = req.userInfo.userId;

    User.find({_id: userId})
    .then(result => {
        user = result[0];
        senderPic = user.profile_pic;
        senderName = user.username;

        comment = {
            body : body,
            senderPic : senderPic,
            senderName : senderName
        }

        Post.updateOne({_id : postId}, {$push : {comments: comment}})
        .then(result => {
            res.status(200).json('done')
        })
    
    })
    .catch(err => res.status(500).json(err))
}

function likePost(req, res){

    emote = req.body.emote;
    postId = req.body.postId;
    userId = req.userInfo.userId;

    Post.find({_id : postId})
    .then(result => {
        post = result[0];
        console.log(post.dislikes)
        if(post.likes.includes(userId) && emote === 'like'){
            res.status(200).json('already likes')
            return
        }else if(post.dislikes.includes(userId)&& emote === 'dislike'){
            res.status(200).json('already dislikes')
        }else if(!post.likes.includes(userId) && !post.dislikes.includes(userId)){
            if(emote === 'like'){
                Post.updateOne({_id : postId}, {$push : {likes : userId}})
                .then(result => {
                    res.status(200).json(result)
                    return
                })
            }else{
                Post.updateOne({_id : postId}, {$push : {dislikes : userId}})
                .then(result => {
                    res.status(200).json(result)
                    return
                })
            }
        }else if(post.dislikes.includes(userId) && emote === 'like'){
            Post.updateOne({_id : postId}, {$pull : {dislikes : userId}, $push : {likes : userId}})
            .then(result => {
                res.status(200).json(result)
                return
            })
        }else if(post.likes.includes(userId) && emote === 'dislike'){
            Post.updateOne({_id : postId}, {$pull : {likes : userId}, $push : {dislikes : userId}})
            .then(result => {
                res.status(200).json(result)
                return
            })
        }
    })
    .catch(err => res.status(500).json(err))
}

module.exports = {
    getPosts,
    createPost,
    addComment,
    likePost
}