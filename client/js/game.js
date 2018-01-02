

// 用到别的模块
// loader.init();
//
var game = {

    init:function () {
        loader.init();

    },


    hideScreen:function (id) {
        var screen = document.getElementById(id);
        screen.style.display = "none";
    },

    hideScreens : function () {
        var screens = document.getElementsByClassName('gamelayer');
        for(var i = 0; i < screens.length;++i){
            screens[i].style.display = "none";
        }
    },

    showScreen : function (id) {
        var screen = document.getElementById(id);
        screen.style.display = "block";
    }
};



window.addEventListener('onload',function () {
    game.init();
},false);