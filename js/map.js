var canvas, stage, context, bmp;
var update = true;
var cursorInCanvas = {
    x: 0,
    y: 0
};

function initMap() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    stage = new createjs.Stage(canvas);
    createjs.Touch.enable(stage);

    // enabled mouse over / out events
    stage.enableMouseOver(10);
    var image = new Image();
    image.onload = handleImageLoad;
    image.src = "Map.png";

}

function centerTo(x, y) {
    bmp.x = -bmp.scale * x + canvas.width / 2;
    bmp.y = -bmp.scale * y + canvas.height / 2;
}

function handleImageLoad(event) {
    var image = event.target;
    var container = new createjs.Container();
    stage.addChild(container);
    bmp = new createjs.Bitmap(image);
    container.addChild(bmp);
    window.addEventListener('resize', resizeCanvas, false);
    bmp.on("mousedown", function (evt) {
        console.log(evt);
        this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
    });
    bmp.on("pressmove", function (evt) {
        // console.log('tata', imageTransform);
        this.x = evt.stageX + this.offset.x;
        this.y = evt.stageY + this.offset.y;
        // indicate that the stage should be updated on the next tick:
        update = true;
    });
    createjs.Ticker.addEventListener("tick", tick);
    resizeCanvas();
    initBmp();
}

function initBmp() {
    bmp.scaleX = bmp.scaleY = bmp.scale = 0.8;
    centerTo(bmp.image.width / 2, bmp.image.height / 2);
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
        console.log(bmp.getTransformedBounds());
        update = false; // only update once
        stage.update(event);
    }
}