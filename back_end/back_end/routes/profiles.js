var express = require('express');
var router = express.Router();
const auth = require('../auth')
const profileControllers = require('../controllers/profileControllers')
const upload = require('../multer')

/* GET users listing. */
router.get('/', auth.authenticateToken, profileControllers.getUser)

router.get('/suggested', auth.authenticateToken, profileControllers.getSuggested)

router.post('/', auth.authenticateToken, upload.single('image'), profileControllers.addInfo)

module.exports = router;
