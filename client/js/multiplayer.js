
// 开始显示登录界面
var game = {

    init:function () {
        game.hideScreens();
        game.showScreen("loginscreen");
    },

    // 登陆
    loginOn:function () {
        var nameInput = document.getElementById('pname');
        console.log(nameInput.value);
        if (nameInput.value.length < 1){
            return;
        }

        game.hideScreens();
        game.showScreen('multiplayerlobbyscreen');
        multiplayer.start(name);
    },


    hideScreens:function () {
        var layers = document.getElementsByClassName("gamelayer");
        for(var i = 0; i < layers.length; ++i){
            layers[i].style.display = "none";
        }
    },

    showScreen:function (id) {
        var layer = document.getElementById(id);
        layer.style.display = "block";
    },

    hideScreen:function (id) {
        var layer = document.getElementById(id);
        layer.style.display = "none";
    },


};


// io 算是一个全局变量
var multiplayer = {

    websocket_url : "http://localhost:8888",
    socket:undefined,
    statusMessage:{
        "starting" : 'Game Starting',
        "running" : 'Game in progress',
        "waiting" : 'Waiting second player',
        'empty' : 'Open'
    },

    selectRow:function (index) {
        var list = document.getElementById("multiplayergamelist");

        // 删除已经选择的
        for(var  i = list.rows.length - 1; i >=0; i--){
            var row= list.rows[i];
            row.classList.remove("selected");
        }

        list.selectedIndex = index;
        var row = list.rows[index];

        list.value = row.cells[0].value;
        row.classList.add("selected");
    },

    start:function (name) {
        multiplayer.socket = io(multiplayer.websocket_url);
        multiplayer.socket.emit('r_cmd_login',{'name':name});
        // multiplayer.socket.on('a_cmd_login_ok',function (data) {
        //     console.log("登陆成功!");
        //     multiplayer.emit('r_cmd_roomlist');
        // });

        multiplayer.handleMessage();
    },

    handleMessage:function () {

        // 房间列表
        multiplayer.socket.on('a_cmd_roomlist',function (data) {
            console.log(data);
            multiplayer.updateRoomStatus(data);
        });
    },



    // 更新房间列表信息
    updateRoomStatus:function (roomList) {
        var list = document.getElementById('multiplayergamelist');

        // 先删除之前的
        for(var i = list.rows.length-1; i >=0; --i){
            list.deleteRow(i);
        }

        // 然后创建新的列表
        roomList.forEach(function (item,index) {
            var statusMessage = multiplayer.statusMessage[item.status];
            var label  = "Game " + item.roomId + ". " + statusMessage;

            var roomId = item.roomId;

            // 创建一行
            var row  = document.createElement("tr");
            var cell = document.createElement("td");
            cell.innerHTML = label;
            cell.value = roomId;
            row.appendChild(cell);

            row.addEventListener("click",function () {
                if (!list.disabled && !row.disabled){
                    multiplayer.selectRow(index);
                }
            });
            row.className = status;
            list.appendChild(row);

            // disable rooms when running or starting
            if (status === "running" || status === "starting"){
                row.disabled = true;
            }

            // 当选中时,取消其他行的选中状态
            // TODO:为什么？
            if (multiplayer.roomId === roomId){
                this.selectRow(index);
            }
        },this);
    },
};

window.addEventListener('load',function (ev) {
    game.init();
});

