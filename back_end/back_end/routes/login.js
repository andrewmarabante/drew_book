var express = require('express');
var router = express.Router();
const loginControllers = require('../controllers/loginControllers')
const auth = require('../auth')

/* GET home page. */
router.post('/', loginControllers.loginUser)

router.post('/signup', loginControllers.newUser)

router.get('/logout', auth.authenticateToken, loginControllers.logoutUser)

module.exports = router;
