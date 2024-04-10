const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user')

function authenticateToken(req,res,next){
    const token = req.cookies.jwt;
    if (token == null){return res.status(401).json('401')}
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err){return res.status(403).json('403')}
        req.userInfo = user
        next()
    })
}
  
  module.exports = {
    bcrypt,
    jwt,
    authenticateToken
  }