window.addEventListener('resize', resizeCanvas, false);
$('#canvas').mousewheel(function (event) {
    var object = $.extend(true, {}, bmp);
    console.log(object);
    // bmp.regX += event.pageX;
    // bmp.regY += event.pageY;
    var previousScale = bmp.scaleX;
    if(event.deltaY == 1) {
        bmp.scaleX += 0.1;
        bmp.scaleY += 0.1;
        // bmp.x += previousScale * 0.1 * bmp.image.width;
        // bmp.y += previousScale * 0.1 * bmp.image.height;

    } else if (event.deltaY == -1) {
        bmp.scaleX -= 0.1;
        bmp.scaleY -= 0.1;
        // bmp.x -= previousScale * 0.1 * bmp.image.width;
        // bmp.y -= previousScale * 0.1 * bmp.image.height;
        // bmp.regX +=  0.1 * bmp.image.width/2;
        // bmp.regY +=  0.1 * bmp.image.height/2;
    }
    bmp.regX =  calculatePosX(imageTransform.x, bmp.scaleX) + bmp.x;
    bmp.regY =  calculatePosY(imageTransform.y, bmp.scaleY) + bmp.y;
    // bmp.offset = {x: bmp.x - event.pageX, y: bmp.y - event.pageY};
    // bmp.x = event.pageX + bmp.offset.x;
    // bmp.y = event.pageY + bmp.offset.y;
    // console.log(bmp);
    update = true;
});
bmp.on("mousedown", function (evt) {
    // this.parent.addChild(this);
    this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
});
bmp.on("pressmove", function (evt) {
    // console.log('toto', imageTransform);
    // imageTransform.x += evt.stageX;
    // imageTransform.y += evt.stageY;
    // console.log('tata', imageTransform);
    this.x = evt.stageX + this.offset.x;
    this.y = evt.stageY + this.offset.y;
    // indicate that the stage should be updated on the next tick:
    console.log(bmp);
    update = true;
});

function draw() {
    // bmp.scaleX = imageTransform.scale;
    // bmp.scaleY = imageTransform.scale;
    // bmp.regX = (imageTransform.x - (1/imageTransform.scale) * canvas.width / 2);
    // bmp.regY = (imageTransform.y - (1/imageTransform.scale) * canvas.height / 2);
    // bmp.regX = calculatePosX(imageTransform.x, imageTransform.scale);
    // bmp.regY = calculatePosY(imageTransform.y, imageTransform.scale);
    bmp.x = -4479 * 0.8 + canvas.width / 2;
    bmp.y = -3651 * 0.8 + canvas.height / 2;
    // bmp.x = -4479 * 0.8;
    // bmp.y = -3651 * 0.8;
    bmp.scaleX = 0.8;
    bmp.scaleY = 0.8;
    update = true;
}