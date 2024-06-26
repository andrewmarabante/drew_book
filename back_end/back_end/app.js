require('dotenv').config();

var cors = require('cors')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var profilesRouter = require('./routes/profiles');
var chatsRouter = require('./routes/chats');
var loginRouter = require('./routes/login');

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000', 'https://drew-book-jo6x-msap07qlj-andrew-marabantes-projects.vercel.app']; 
const corsOptions = {
  origin: true,
  credentials: true 
};

var app = express();

const mongoose = require('mongoose')

mongoose.connect(process.env.uri)
.then(console.log('Connected to Database'))
.catch(err => console.log(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true , limit: '50mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/profiles', profilesRouter);
app.use('/chats', chatsRouter);
app.use('/login', loginRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log('here')
console.log(process.env.clientID)
console.log(process.env.clientSecret)

module.exports = app;
