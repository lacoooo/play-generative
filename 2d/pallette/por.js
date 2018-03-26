tool.minDistance = 20;
tool.maxDistance = 80;
var brushAngle = 90
var path;
var index = Math.floor(Math.random() * colorPalettes.length)
var index2 = Math.floor(Math.random() * colorPalettes.length)
var colors2 = ['#929383', '#bec0bf', '#fffffe', '#ddf2f3', '#0a0f11', '#5dbfc0', '#b99314', '#fbc303', '#fba3dc', '#ec370d', '#195e98', '#44467f']
var simplex = new SimplexNoise()
var raster = new Raster('img')
var scale = 200
var begin = false

raster.visible = false;
raster.on('load', function () {
    raster.size = new Size(1000, 1000);
    begin = true

});
function producePoint() {
    var x = tombola.range(100, 200)
    var y = tombola.range(100, 200)
    path.add(new Point(x, y));
}
function productCircle() {
    var x = tombola.range(0, 1000)
    var y = tombola.range(0, 1000)
    var q = x + tombola.range(0, scale)
    var w = y + tombola.range(0, scale)
    var a = x + tombola.range(0, scale)
    var s = y + tombola.range(0, scale)
    path = new Path()
    path.add(new Point(x, y))
    path.add(new Point(q, w))
    path.add(new Point(a, s))
    path.fillColor = raster.getPixel(x, y)
    path.closed = true;
    path.smooth()
    if (Math.random() > 0.6) {
        path.flatten(10)
    }
}

function onFrame() {
    if (!begin) return
    init()
    if (scale > 40) scale -= 0.5
}

function init() {
    for (var i = 0; i < 10; i++) {
        productCircle()
    }
}
