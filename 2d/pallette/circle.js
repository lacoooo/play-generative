;
var options = (function () {
    function Options() {
        this.mode = 'xor'
        this.init = function() {
            project.activeLayer.children = []
        }
    }

    var options = new Options()

    function monit() {
        var gui = new dat.GUI()
        gui.add(options, 'mode', ['normal', 'multiply', 'screen', 'overlay', 'soft-light',
        'hard- light', 'color-dodge', 'color-burn', 'darken',
        'lighten', 'exclusion', 'hue', 'saturation',
        'luminosity', 'color', 'add', 'subtract', 'average', 'pin-light',
        'negation', 'source- over', 'source-in', 'source-out', 'source-atop',
        'destination-over', 'destination-in', 'destination-out',
        'destination-atop', 'lighter', 'darker', 'copy', 'xor'])
        gui.add(options, 'init')
    }
    monit()

    return options
})()


tool.minDistance = 20;
tool.maxDistance = 80;
var brushAngle = 90
var path;
var index = Math.floor(Math.random() * colorPalettes.length)
var index2 = Math.floor(Math.random() * colorPalettes.length)
var colors2 =
    ['#929383',
        '#bec0bf',
        '#b4b4b4',
        '#ececec',
        '#47499e',
        '#ef8ed2',
        '#ffffff',
        '#ee3f0b',
        '#ddf2f3',
        '#0a0f11',
        '#5dbfc0',
        '#4eb0b1',
        '#b99314',
        '#fbc303',
        '#fba3dc',
        '#ec370d',
        '#195e98',
        '#ffd63c',
        '#bf3f11',
        '#44467f']
var simplex = new SimplexNoise()
var begin = false
function productCircle() {
    var x = tombola.range(0, 1000)
    var y = tombola.range(0, 1000)
    var scale = tombola.range(20, 200)
    var circle = new Path.Circle(new Point(x, y), scale)
    circle.fillColor = colors2[tombola.range(0, colors2.length - 1)]
    // circle.fillColor = '#000'
    circle.blendMode = options.mode
}

function init() {
    for (var i = 0; i < 20; i++) {
        productCircle()
    }
}
setInterval(function () {
    init()
}, 1000)
function onFrame() {
    if (!begin) return
    // init()
    if (scale > 40) scale -= 0.5
}