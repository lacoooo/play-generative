var final = document.getElementById('final')
var ctx = final.getContext('2d')
final.setAttribute('width', 1000)
final.setAttribute('height', 1000)
var canvas = document.getElementById('canvas')


tool.minDistance = 20;
tool.maxDistance = 80;
var brushAngle = 90
var path;
var index = Math.floor(Math.random() * colorPalettes.length)
var index2 = Math.floor(Math.random() * colorPalettes.length)
var colors2 = ['#929383', '#bec0bf', '#fffffe', '#ddf2f3', '#0a0f11', '#5dbfc0', '#b99314', '#fbc303', '#fba3dc', '#ec370d', '#195e98', '#44467f']
var simplex = new SimplexNoise()
var raster = new Raster('img')
var scale = 40
var begin = false

raster.visible = false;
raster.on('load', function () {
    // Since the example image we're using is much too large,
    // and therefore has way too many pixels, lets downsize it to
    // 40 pixels wide and 30 pixels high:
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
    if (raster.getPixel(x, y).gray < Math.random()) {
        var q = x + tombola.range(-scale, scale)
        var w = y + tombola.range(-scale, scale)
        var a = x + tombola.range(-scale, scale)
        var s = y + tombola.range(-scale, scale)
        var r = x + tombola.range(-scale, scale)
        var t = y + tombola.range(-scale, scale)
        path = new Path()
        path.add(new Point(x, y))
        path.add(new Point(q, w))
        path.add(new Point(a, s))
        path.add(new Point(r, t))
        // path.fillColor = colors2[tombola.range(0, colors2.length - 1)]
        // path.fillColor = new Color(1, 1, 1)
        // path.fillColor = new Color(0, 0, 0)
        path.opacity = 0.6
        path.fillColor = colors2[tombola.range(0, colors2.length - 1)]
        path.closed = true
        path.smooth()
        if (Math.random() > 0.6) {
            path.flatten(10)
        }
    }

}

function init() {
    for (var i = 0; i < 200; i++) {
        productCircle()
    }
}
setInterval(function() {
    ctx.drawImage(canvas, 0, 0)
    project.activeLayer.children = []
}, 3000)
function onFrame() {
    if (!begin) return
    init()
    if (scale > 40) scale -= 0.5
}