var express = require('express');
var router = express.Router();
const loginControllers = require('../controllers/loginControllers')

/* GET home page. */
router.post('/', loginControllers.loginUser)

router.post('/signup', loginControllers.newUser)

module.exports = router;
