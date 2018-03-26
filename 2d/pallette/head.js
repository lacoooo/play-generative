tool.minDistance = 20;
tool.maxDistance = 80;
var brushAngle = 90
var path;
var index = Math.floor(Math.random() * colorPalettes.length)
var index2 = Math.floor(Math.random() * colorPalettes.length)
var colors2 = ['#929383', '#bec0bf', '#fffffe', '#ddf2f3', '#0a0f11', '#5dbfc0', '#b99314', '#fbc303', '#fba3dc', '#ec370d', '#195e98', '#44467f']
var simplex = new SimplexNoise()
var raster = new Raster('img')
var scale = 20
var begin = false

raster.visible = false;
raster.on('load', function () {
    // Since the example image we're using is much too large,
    // and therefore has way too many pixels, lets downsize it to
    // 40 pixels wide and 30 pixels high:
    raster.size = new Size(1000, 1000);
    begin = true

});
function productCircle() {
    var x = tombola.range(0, 1000)
    var y = tombola.range(0, 1000)
    console.log(raster.getPixel(x, y).gray)
    if (raster.getPixel(x, y).gray > Math.random() * 0.8) return
    path = new Path.Circle(new Point(x, y), scale)
    path.fillColor = '#000'
    path.blendMode = 'xor'
}

function init() {
    for (var i = 0; i < 20; i++) {
        productCircle()
    }
    scale-=0.05
}

function onFrame() {
    if (!begin) return
    init()
    // if (scale > 40) scale -= 0.5
}