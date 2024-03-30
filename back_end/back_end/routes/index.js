var express = require('express');
var router = express.Router();
const homeController = require('../controllers/homeController');
const auth = require('../auth');

/* GET home page. */
router.get('/', auth.authenticateToken, homeController.getPosts)

router.post('/', auth.authenticateToken, homeController.createPost)

module.exports = router;
