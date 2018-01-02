var http = require('http');
var SocketIO  = require('../node_modules/socket.io');
var fs = require('fs');
var url = require('url');
var game = require('./game');


// client res dir
var baseName = __dirname+"/../client";

// 创建一个服务器
var server = http.createServer(function (req,res) {

    if (req.url != "/favicon.ico"){
        var urlObj = url.parse(req.url,true,false);
        console.log(urlObj.pathname);

        // 默认打开的是 chat.html
        fs.readFile(baseName + urlObj.pathname + (urlObj.pathname=='/'?"chat.html":""),function (err,data) {
            if (err){
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }else {
                res.end(data);
            }
        });
    }
});

var io = SocketIO.listen(server);

io.sockets.on('connection',function (socket) {


    console.log("a user connected!");

    //
   socket.on('r_cmd_login',function (data) {

       // 用户登陆成功,则加入到玩家列表里面
        console.log(data.name);

        game.addPlayer(socket);
        // check name
        // 登陆成功后,直接发送一个显示房间的列表过去
        game.sendData(socket,'a_cmd_roomlist',game.gameRooms);
   });



   socket.on('disconnect',function () {
        console.log("有用户离开");
   });
});



server.listen(8888);
console.log("服务器启动成功! 请访问: http://localhost:8888");



