const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user')
const GoogleStrategy = require('passport-google-oauth20')

passport.use(
  new GoogleStrategy({

    callbackURL: '/login/google/redirect',
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,

  }, (accessToken, refreshToken, profile, done) => {
    done(null, profile)
  })
)

function authenticateToken(req,res,next){
    const accessToken = req.cookies.jwt;

    if (accessToken == null){return res.status(401).json('401')}
    jwt.verify(accessToken, process.env.SECRET, (err, user) => {
        if(err){
          return res.status(403).json('403')
        }
        req.userInfo = user
        next()
    })
}
  

  module.exports = {
    bcrypt,
    jwt,
    authenticateToken,
    passport
  }