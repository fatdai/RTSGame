


var mouse = {
    // x,y coordinates of mouse relative to top left corner of canvas
    x:0,
    y:0,

    // x,y coordinates of mouse relative to top left corner of game map
    gameX : 0,
    gameY : 0,

    // game grid x,y coordinates of mouse
    gridX : 0,
    gridY : 0,

    // Is the mouse inside the canvas region
    insideCanvas : false,

    init:function () {
        // Listen for mouse events on the game foreground canvas
        var canvas = document.getElementById("gameforegroundcanvas");

        canvas.addEventListener("mousemove",mouse.mousemovehandler,false);
        canvas.addEventListener("mouseenter",mouse.mouseenterhandler,false);
        canvas.addEventListener("mouseout",mouse.mouseouthandler,false);

        // canvas.addEventListener("mousedown",mouse.mousedownhandler,false);
        // canvas.addEventListener("mouseup",mouse.mouseuphandler,false);
        // canvas.addEventListener("mouseout",mouse.mouseuphandler,false);

        mouse.canvas = canvas;
    },

    calculateGameCoordinates : function () {
        mouse.gameX = mouse.x + game.offsetX;
        mouse.gameY = mouse.y + game.offsetY;

        mouse.gridX = Math.floor(mouse.gameX/game.gridSize);
        mouse.gridY = Math.floor(mouse.gameY/game.gridSize);
    },

    setCoordinates : function (clientX,clientY) {
       var offset = mouse.canvas.getBoundingClientRect();
       mouse.x = (clientX - offset.x)/game.scale;
       mouse.y = (clientY - offset.y)/game.scale;
       mouse.calculateGameCoordinates();
    },


    // mousedownhandler:function (ev) {
    //     mouse.down = true;
    //     ev.preventDefault();
    // },
    mousemovehandler:function (ev) {
       mouse.insideCanvas = true;
       mouse.setCoordinates(ev.clientX,ev.clientY);
    },
    mouseuphandler:function (ev) {
        mouse.down = false;
        mouse.dragging = false;
        ev.preventDefault();
    }
};