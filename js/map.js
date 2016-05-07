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
    this.init(imageMap);
}

Map.prototype.init = function init(imageMap) {
    this.stage.addChild(this.mapContainer);
    this.mapContainer.addChild(new createjs.Bitmap(imageMap));
    this.createAllEvents();
    this.resizeCanvas();
    this.initContainerMap();
    this.update = true;
};

Map.prototype.initContainerMap = function initContainerMap() {
    this.setScale(this.config.map.scale);
    this.centerTo(this.config.map.x, this.config.map.y);
    this.mapContainer.cursor = "default";
};

Map.prototype.setScale = function setScale(scale) {
    this.mapContainer.scale = this.mapContainer.scaleX = this.mapContainer.scaleY = scale;
};

Map.prototype.zoom = function zoom(increment) {
    this.setScale(this.mapContainer.scale + increment);
};

Map.prototype.keepMapUnderPos = function keepMapUnderPos(x, y) {
    var mapPos = this.getMapPosFromWindowPos(x, y);
    this.mapContainer.x = x - this.mapContainer.scale * mapPos.x;
    this.mapContainer.y = y - this.mapContainer.scale * mapPos.y;
};

Map.prototype.centerTo = function centerTo(x, y) {
    this.mapContainer.x = this.canvas.width / 2 - this.mapContainer.scale * x;
    this.mapContainer.y = this.canvas.height / 2 - this.mapContainer.scale * y;
};

Map.prototype.getMapPosFromWindowPos = function getMapPosFromWindowPos(x, y) {
    return {
        x: (x - this.unmodifiedMapContainer.x) / this.unmodifiedMapContainer.scale,
        y: (y - this.unmodifiedMapContainer.y) / this.unmodifiedMapContainer.scale
    };
};

Map.prototype.createAllEvents = function createAllEvents() {
    this.resizeCanvasEvent();
    this.mouseDownEvent();
    this.pressMoveEvent();
    this.pressUpEvent();
    this.mouseWheelEvent();
    this.tickEvent();
};

Map.prototype.mouseDownEvent = function mouseDownEvent() {
    this.mapContainer.on("mousedown", function (evt) {
        this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
        this.cursor = "move";
    });
};

Map.prototype.pressMoveEvent = function pressMoveEvent() {
    var self = this;
    this.mapContainer.on("pressmove", function (evt) {
        this.x = evt.stageX + this.offset.x;
        this.y = evt.stageY + this.offset.y;
        this.cursor = "move";
        self.update = true;
    });
};

Map.prototype.pressUpEvent = function pressUpEvent() {
    var self = this;
    this.mapContainer.on("pressup", function (evt) {
        this.cursor = "default";
        self.update = true;
    });
};

Map.prototype.mouseWheelEvent = function mouseWheelEvent() {
    var self = this;
    $('#canvas').mousewheel(function (event) {
        if (event.deltaY == 1) {
            self.zoom(0.1);
        } else if (event.deltaY == -1) {
            self.zoom(-0.1);
        }
        self.keepMapUnderPos(event.pageX, event.pageY);
        self.update = true;
    });
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
    var self = this;
    createjs.Ticker.addEventListener("tick", function(event) {
        if (self.update) {
            self.copyMapContainer();
            self.update = false; // only update once
            self.stage.update(event);
        }
    });
};

Map.prototype.copyMapContainer = function copyMapContainer() {
    $.extend(true, this.unmodifiedMapContainer, this.mapContainer);
};

function Compass() {

}
