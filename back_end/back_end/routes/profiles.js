var express = require('express');
var router = express.Router();
const auth = require('../auth')
const profileControllers = require('../controllers/profileControllers')
const upload = require('../multer')

/* GET users listing. */
router.get('/', auth.authenticateToken, profileControllers.getUser)

router.get('/suggested', auth.authenticateToken, profileControllers.getSuggested)

router.get('/:id', auth.authenticateToken, profileControllers.getUser)

router.get('/:id/friends', auth.authenticateToken, profileControllers.getFriends)

router.post('/', auth.authenticateToken, upload.single('image'), profileControllers.addInfo)

router.put('/add', auth.authenticateToken, profileControllers.addFriend)

router.put('/remove', auth.authenticateToken, profileControllers.removeFriend)

router.put('/info', auth.authenticateToken, profileControllers.updateInfo)

router.put('/bio', auth.authenticateToken, profileControllers.updateBio)

module.exports = router;
