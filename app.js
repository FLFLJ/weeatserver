var createError = require('http-errors');
//引入express
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//引入数据库、session
var session =require('express-session')
var {Mongoose}=require('./untils/config.js')

//引入二级接口
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter=require('./routes/admin');
let foodRouter=require('./routes/food')
let chatRouter=require('./routes/chat')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//使用session中的验证码功能
app.use(session({
	secret:'$&*^h>/g',
	name:'sessionId',
	resave:false,
	saveUninitialized:false,
	cookie:{
		maxAge:1000*60*60
	}
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//使用一级接口
app.use('/', indexRouter);
app.use('/api3/users', usersRouter);
app.use('/api3/admin',adminRouter);
app.use('/api3/food',foodRouter)
app.use('/api3/chat',chatRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//连接数据库数据库
Mongoose.connect();

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;