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
let gameRouter=require('./routes/game')
let topicRouter=require('./routes/topic')

var app = express();


//socket建立，主动向客户端发送数据
//let ws=require('./untils/ws.js')
//ws.wsStart()



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
app.use('/api3/game',gameRouter)
app.use('/api3/topic',topicRouter)
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

let TopicModel=require('./models/topic.js')
let ws = require("nodejs-websocket");
let players=0
let userHeads={}
let Server = ws.createServer(function(conn){
  conn.on("text", async function (str) {
    let massege=JSON.parse(str)
  	if(massege.title=="match"){
      userHeads[massege.userHead]=massege.userHead
	  	players+=1 
	  	console.log("players:")
	  	console.log(players)
	    if(players<=1){
        console.log("客户端发来match请求！")
	    }
	    else if(players==2){
      let playLevel=massege.playLevel 
      let topic=await TopicModel.gettopic(playLevel)
    	console.log("已经有两个人，可进入对战！")
      console.log(topic)
	     //conn.sendText("canGo");
       let canGo={
        title:"canGo",
        usersHead:userHeads,
        topic:topic
       }
	     broadcast(Server,JSON.stringify(canGo)) 
	    }
  	}
  	else if(massege.title=="canNextTopic"){
      let canNextTopic={
        title:"canNextTopic",
      }
  		broadcast(Server,JSON.stringify(canNextTopic))
  	}
 
    else if(massege.title=="canLeave"){
      let canLeave={
        title:"canLeave",
      }
     broadcast(Server,JSON.stringify(canLeave))
     players=0
    }
    else if(massege.title=="cancelmatch"){
     players-=1
     console.log("players")
     console.log(players)
    }
    else{
     console.log("message:"+massege.title)
     let normal={
        title:massege.title,
      }
     broadcast(Server,JSON.stringify(normal))
    }
    
  })
  conn.on("close", function (code, reason) {
    console.log("关闭连接")
   // players-=1
    console.log("players:")
  	console.log(players)
  });
  conn.on("error", function (code, reason) {
    console.log("异常关闭")
  });
}).listen(8081)
console.log("WebSocket建立完毕") 


let broadcast=function(server, msg) {
  //server.connections是一个数组，包含所有连接进来的客户端
  server.connections.forEach(function (conn) {
    //connection.sendText方法可以发送指定的内容到客户端，传入一个字符串
    //这里为遍历每一个客户端为其发送内容
    conn.sendText(msg);
  })
}

module.exports = app;