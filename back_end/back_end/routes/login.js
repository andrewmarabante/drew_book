var express = require('express');
var router = express.Router();
const loginControllers = require('../controllers/loginControllers')
const auth = require('../auth')

/* GET home page. */
router.post('/', loginControllers.loginUser)

router.post('/signup', loginControllers.newUser)

router.post('/logout', auth.authenticateToken, loginControllers.logoutUser)

router.get('/google', auth.passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', auth.passport.authenticate('google', { session: false }), loginControllers.googleLogin)
module.exports = router;
