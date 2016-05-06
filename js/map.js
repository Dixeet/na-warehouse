var canvas, stage, context, cmp, container;
var update = true;
var configColor = {
    1: 'Black', //Pirate
    2: 'Gold', //Spanish
    3: 'DarkBlue', //French
    4: 'Red', //English
    5: 'DarkOrange', // Hollande
    6: 'Maroon', //Danish
    7: 'Cyan', //Sweden
    8: 'Lime', //Us
    9: 'DimGrey'//Neutral

};
var infosAfterRendering = {
    centerX: 0,
    centerY: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0
};


function updateInfos(image) {
    infosAfterRendering.x = image.x;
    infosAfterRendering.y = image.y;
    infosAfterRendering.width = image.width;
    infosAfterRendering.height = image.height;
    infosAfterRendering.centerX = (canvas.width / 2 - image.x) / container.scale;
    infosAfterRendering.centerY = (canvas.height / 2 - image.y) / container.scale;
    infosAfterRendering.scale = container.scale;
}

function centerToPreviousPos() {
    centerTo(infosAfterRendering.centerX, infosAfterRendering.centerY);
}

function centerToMouse(x, y) {
    moveTo((x - infosAfterRendering.x) / infosAfterRendering.scale, (y - infosAfterRendering.y) / infosAfterRendering.scale, x, y);
}

function moveTo(x, y, posX, posY) {
    container.x = -container.scale * x + posX;
    container.y = -container.scale * y + posY;
}

function centerTo(x, y) {
    container.x = -container.scale * x + canvas.width / 2;
    container.y = -container.scale * y + canvas.height / 2;
}

function keepCompassSize(cmp) {
    var currentSize = cmp.getBounds().width * cmp.scale * cmp.previousScale;
    var currentCenterX = cmp.getBounds().width * cmp.scale / 2;
    var currentCenterY = cmp.getBounds().height * cmp.scale / 2;
    cmp.scale = cmp.scaleX = cmp.scaleY  = currentSize / (cmp.getBounds().width * container.scale);
    var nextCenterX = cmp.getBounds().width * cmp.scale / 2;
    var nextCenterY = cmp.getBounds().height * cmp.scale / 2;
    cmp.x -= nextCenterX - currentCenterX;
    cmp.y -= nextCenterY - currentCenterY;
}


function initMap() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    $.getScript("http://storage.googleapis.com/nacleanopenworldprodshards/ItemTemplates_cleanopenworldprodeu1.json").done(
        $.getScript("http://storage.googleapis.com/nacleanopenworldprodshards/Nations_cleanopenworldprodeu1.json").done(
            $.getScript("http://storage.googleapis.com/nacleanopenworldprodshards/Shops_cleanopenworldprodeu1.json").done(
                $.getScript("http://storage.googleapis.com/nacleanopenworldprodshards/Ports_cleanopenworldprodeu1.json").done(function () {
                    stage = new createjs.Stage(canvas);
                    createjs.Touch.enable(stage);

                    // enabled mouse over / out events
                    stage.enableMouseOver(10);
                    var map = new Image();
                    map.onload = handleImageLoad;
                    map.src = "img/old_map.jpg";
                    var compass = new Image();
                    compass.src = "img/compass.png";
                })
            )))
    ;
}


function handleImageLoad(event) {
    var compass = new Image();
    compass.src = "img/compass.png";
    var map = event.target;
    container = new createjs.Container();
    //layer = new createjs.Container();
    stage.addChild(container);
    //container.addChild(layer);
    var bmp = new createjs.Bitmap(map);
    cmp = new createjs.Container();
    var cmpImage = new createjs.Bitmap(compass);
    var line = new createjs.Shape();
    cmp.addChild(cmpImage);
    cmp.scale = cmp.scaleX = cmp.scaleY = 2;
    cmp.previousMapX = 0;
    cmp.previousMapY = 0;
    container.addChild(bmp);
    container.addChild(cmp);
    container.cursor = "default";
    Ports.forEach(function (port, idx) {
        var circle = new createjs.Shape();
        circle.graphics.beginFill(configColor[port.Nation]).drawCircle(0, 0, 12);
        circle.x = (port.sourcePosition.x + 208);
        circle.y = (port.sourcePosition.y + 55);
        circle.cursor = "pointer";
        circle.idx = idx;
        circle.on("click", function (evt) {
            console.log('toto');
        });
        container.addChild(circle);
    });
    window.addEventListener('resize', resizeCanvas, false);
    container.on("mousedown", function (evt) {
        this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
        container.cursor = "move";

    });
    container.on("pressmove", function (evt) {
        this.x = evt.stageX + this.offset.x;
        this.y = evt.stageY + this.offset.y;
        container.cursor = "move";
        // indicate that the stage should be updated on the next tick:
        update = true;
    });
    container.on("pressup", function (evt) {
        container.cursor = "default";
        update = true;
    });
    container.on("dblclick", function (evt) {
        console.log('dbl');
        //if (line.drawn) {
        //    cmp.x = (evt.stageX - cmp.getTransformedBounds().width * container.scale / 2 - container.x) / container.scale;
        //    cmp.y = (evt.stageY - cmp.getTransformedBounds().height * container.scale / 2 - container.y) / container.scale;
        //    line.x = cmp.x + cmp.getTransformedBounds().width * container.scale / 2;
        //    line.y = cmp.y + cmp.getTransformedBounds().height * container.scale / 2;
        //    cmp.removeChild(line);
        //    line.drawn = false;
        //    line.init = false;
        //
        //} else if (line.init) {
        //    line.graphics.beginFill('black').lineTo(evt.stageX, evt.stageY);
        //    line.drawn = true;
        //} else {
        //    line.x = cmp.x + cmp.getTransformedBounds().width * container.scale / 2;
        //    line.y = cmp.y + cmp.getTransformedBounds().height * container.scale / 2;
        //    cmp.addChild(line);
        //    line.init = true;
        //}
        cmp.x = (evt.stageX - cmp.getTransformedBounds().width * container.scale / 2 - container.x) / container.scale;
        cmp.y = (evt.stageY - cmp.getTransformedBounds().height * container.scale / 2 - container.y) / container.scale;
        update = true;
    });
    $('#canvas').mousewheel(function (event) {
        cmp.previousScale = container.scale;
        cmp.previousX = container.x;
        cmp.previousY = container.y;
        if (event.deltaY == 1) {
            container.scale = container.scaleY = container.scaleX = container.scale + 0.1;
        } else if (event.deltaY == -1) {
            container.scale = container.scaleY = container.scaleX = container.scale - 0.1;
        }
        //centerToPreviousPos();
        centerToMouse(event.pageX, event.pageY);
        keepCompassSize(cmp);
        update = true;
    });
    createjs.Ticker.addEventListener("tick", tick);
    resizeCanvas();
    initBmp();
}


function initBmp() {
    //bmp.scaleX = bmp.scaleY = bmp.scale = 1;
    container.scaleX = container.scaleY = container.scale = 0.2;
    //centerTo(bmp.image.width / 2, bmp.image.height / 2);
    centerTo(4409, 4376);
    update = true;
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    update = true;
}

function tick(event) {
    // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
    if (update) {
        //console.log(container.getTransformedBounds().toString());
        updateInfos(container.getTransformedBounds());
        update = false; // only update once
        stage.update(event);
    }
}