
// 用到的其他模块的方法:
// game.showScreen('loadingscreen');
// game.hideScreen("loadingscreen");
var loader = {

    loaded : true,
    loadedCount : 0, // 已经加载的资源数
    totalCount : 0, // 需要被加载的资源数

    init:function () {
        // 检查浏览器对声音格式的支持
        // TODO
    },

    loadImage : function (url) {
        this.totalCount++;
        this.loaded = false;
        game.showScreen('loadingscreen');

        var image = new Image();
        image.src = url;
        image.addEventListener("load",loader.itemLoaded,false);
        return image;
    },

    loadSound : function (url) {
        this.loaded = false;
        this.totalCount++;

        game.showScreen('loadingscreen');

        var audio = new Audio();
        audio.src = url;
        audio.addEventListener("canplaythrough",loader.itemLoaded,false);
        return audio;
    },
    itemLoaded : function (ev) {
        ev.target.removeEventListener(ev.type,loader.itemLoaded,false);
        loader.loadedCount++;

        document.getElementById("loadingmessage").innerHTML = "Loaded " + loader.loadedCount + " of " + loader.totalcount;
        if(loader.loadedCount == loader.totalCount){
            // 已经加载完毕,然后重置数据
            loader.loaded = true;
            loader.loadedCount = 0;
            loader.totalCount = 0;

            game.hideScreen("loadingscreen");
            if (loader.onload){
                loader.onload();
                loader.onload = undefined;
            }
        }

    }
};