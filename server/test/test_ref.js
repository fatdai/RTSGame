
var player = [];
for (var i = 0; i < 3; ++i){
    player.push(i);
}


var obj = {};
obj.player = player;

player.push(100);

console.log(obj.player);