var express = require('express');
var router = express.Router();
const homeController = require('../controllers/homeController');
const auth = require('../auth');
const upload = require('../multer')

/* GET home page. */
router.get('/', auth.authenticateToken, homeController.getPosts)

router.post('/', auth.authenticateToken, upload.array('image', 5) ,homeController.createPost)

router.post('/comment', auth.authenticateToken, homeController.addComment)

router.post('/likes', auth.authenticateToken, homeController.likePost)

router.delete('/', auth.authenticateToken, homeController.deletePost)

module.exports = router;
