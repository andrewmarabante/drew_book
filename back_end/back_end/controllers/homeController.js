const Post = require('../models/post');
const User = require('../models/user');
const cloudinary = require('../cloudinary')

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
                            likes: []
                        }

                        console.log(postDetails)

                        const newPost = new Post(postDetails);

                        newPost.save()
                            .then(result => res.status(200).json(result))
                            .catch(err => res.status(500).json(err))
                    }
                }
            })
        })
    }
}

module.exports = {
    getPosts,
    createPost
}