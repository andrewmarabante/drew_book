var express = require('express');
var router = express.Router();
const chatController = require('../controllers/chatController')
const auth = require('../auth')

/* GET users listing. */
router.get('/', auth.authenticateToken, chatController.getChats)

router.post('/', auth.authenticateToken, chatController.newChat)

router.put('/', auth.authenticateToken, chatController.newMessage)

router.delete('/', auth.authenticateToken, chatController.deleteMessage)

module.exports = router;