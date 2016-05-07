'use strict';

function NavalMap(canvasId, imageMapUrl, imageCompassUrl, config) {
    this.canvas = document.getElementById(canvasId);
    this.imageMap = new Image();
    this.imageCompass = new Image();
    this.config = config;
    this.init(imageMapUrl, imageCompassUrl);
}

NavalMap.prototype.init = function init(imageMapUrl, imageCompassUrl) {
    var self = this;
    this.loadDataUrl(function () {
        self.loadImageMap(imageMapUrl, function () {
                self.loadImageCompass(imageCompassUrl, function () {
                    var stage = new createjs.Stage(canvas);
                    createjs.Touch.enable(stage);
                    stage.enableMouseOver(10);
                    self.map = new Map(self.canvas, stage, self.imageMap, self.imageCompass, self.config);

                })
            }
        )
    });
};

NavalMap.prototype.loadImageMap = function loadImageMap(url, cb) {
    this.imageMap.src = url;
    this.imageMap.onload = function () {
        if (cb) {
            cb();
        }
    };
};

NavalMap.prototype.loadImageCompass = function loadImageCompass(url, cb) {
    this.imageCompass.src = url;
    this.imageCompass.onload = function () {
        if (cb) {
            cb();
        }
    };
};

NavalMap.prototype.loadDataUrl = function loadDataUrl(cb) {
    $.getScript("http://storage.googleapis.com/nacleanopenworldprodshards/ItemTemplates_cleanopenworldprodeu1.json").done(
        $.getScript("http://storage.googleapis.com/nacleanopenworldprodshards/Nations_cleanopenworldprodeu1.json").done(
            $.getScript("http://storage.googleapis.com/nacleanopenworldprodshards/Shops_cleanopenworldprodeu1.json").done(
                $.getScript("http://storage.googleapis.com/nacleanopenworldprodshards/Ports_cleanopenworldprodeu1.json").done(function () {
                        if (cb) {
                            cb();
                        }
                    }
                ))))
    ;
};

function Map(canvas, stage, imageMap, imageCompass, config) {
    this.canvas = canvas;
    this.config = config;
    this.stage = stage;
    this.mapContainer = new createjs.Container();
    this.unmodifiedMapContainer = {};
    this.compass = new Compass();
    this.update = false;
    this.init();
}

Map.prototype.init = function init(imageMap, imageCompass) {
    this.stage.addChid(this.mapContainer);
    this.mapContainer.addChid(new createjs.Bitmap(imageMap));
    this.createAllEvents();
};

Map.prototype.moveTo = function moveTo(x, y) {
    this.mapContainer.x = x - this.mapContainer.scale * (x - this.unmodifiedMapContainer.x) / this.unmodifiedMapContainer.scale;
    this.mapContainer.y = x - this.mapContainer.scale * (y - this.unmodifiedMapContainer.y) / this.unmodifiedMapContainer.scale;
};

Map.prototype.centerTo = function centerTo(x, y) {
    //moveTo
};

Map.prototype.createAllEvents = function createAllEvents() {

};

Map.prototype.resizeCanvasEvent = function resizeCanvasEvent() {
    window.addEventListener('resize', this.resizeCanvas, false);
};

Map.prototype.resizeCanvas = function resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.update = true;
};

Map.prototype.tickEvent = function tickEvent() {
    createjs.Ticker.addEventListener("tick", this.tick);
};

Map.prototype.tick = function tick(event) {
    if (this.update) {
        this.copyMapContainer();
        this.update = false; // only update once
        stage.update(event);
    }
};

Map.prototype.copyMapContainer = function copyMapContainer() {
    $.extend(true, this.unmodifiedMapContainer, this.mapContainer);
};

function Compass() {

}
