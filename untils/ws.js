//socket建立，主动向客户端发送数据
/*let _this=this
let wsStart=function(){
  var ws = require("nodejs-websocket");
var Server = ws.createServer(function(conn){
  conn.on("text", function (str) {
    if(str=="please"){
      console.log("客户端发来please请求！")
    }
    else{
     console.log("message:"+str)
     conn.sendText("My name is Web!");
     broadcast(Server,str) 
    }
    
  })
  conn.on("close", function (code, reason) {
    console.log("关闭连接")
  });
  conn.on("error", function (code, reason) {
    console.log("异常关闭")
  });
}).listen(8081)
console.log("WebSocket建立完毕") 

}



function broadcast(server, msg) {
  //server.connections是一个数组，包含所有连接进来的客户端
  server.connections.forEach(function (conn) {
    //connection.sendText方法可以发送指定的内容到客户端，传入一个字符串
    //这里为遍历每一个客户端为其发送内容
    conn.sendText(msg);
  })
}

module.exports={
  wsStart,
  broadcast
}