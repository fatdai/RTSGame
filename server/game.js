
// 所有的在线玩家
var players = [];

// 初始化一组房间
var gameRooms = [];
for(var i = 0; i < 10; ++i){
    gameRooms.push({status:"empty",players:[],roomId:i+1});
}

var game = {};
game.gameRooms = gameRooms;
game.players = players;

game.sendData = function (socket,cmd,data) {
    socket.emit(cmd,data);
};


game.addPlayer = function (socket) {
    var player = {connection:socket};
    players.push(player);
};

module.exports = game;