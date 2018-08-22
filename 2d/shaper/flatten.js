;
var sn = new SimplexNoise()
var paths = []
var options = (function () {

    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0]
        if (!e) return
        if (e.keyCode == 90 && e.ctrlKey) {
            var current = project.activeLayer.children[project.activeLayer.children.length - 1]
            if (!current) return
            current.remove()
        }
    }


    var canvas = document.getElementById('canvas')
    var save = document.getElementById('save')

    function Options() {
        this.lineColor = window.localStorage.lineColor ? JSON.parse(window.localStorage.lineColor) : [150, 150, 150]
        this.fillColor = window.localStorage.fillColor ? JSON.parse(window.localStorage.fillColor) : [150, 150, 150]
        this.blendMode = 'normal'
        this.fill = true
        this.line = false
        this.lineWidth = 1
        this.lineClose = true
        this.lineDash = false
        this.flatten = 0
        this.simplify = 0
        this.outlinePrev = false
        this.smooth = false
        this.back = function () {
            var current = project.activeLayer.children[project.activeLayer.children.length - 1]
            if (!current) return
            current.remove()
        }
        this.download_png = function () {
            var base64 = canvas.toDataURL('image/png', 1)
            save.setAttribute('href', base64)
            save.setAttribute('download', Math.random() * 10000000000000000 + ".png")
            save.click()
        }
        this.download_svg = function () {

            function downloadDataUri(options) {
                if (!options.url) {
                    options.url = "http://download-data-uri.appspot.com/";
                }
                $('<form method="post" action="' + options.url
                    + '" style="display:none"><input type="hidden" name="filename" value="'
                    + options.filename + '"/><input type="hidden" name="data" value="'
                    + options.data + '"/></form>').appendTo('body').submit().remove();
            }

            var svg = project.exportSVG({ asString: true });
            downloadDataUri({
                data: 'data:image/svg+xml;base64,' + btoa(svg),
                filename: 'export.svg'
            });

        }
        this.clear = function () {
            project.activeLayer.children = []
        }
    }

    var options = new Options()

    function monit() {
        var gui = new dat.GUI()
        var lineColor = gui.addColor(options, 'lineColor')
        var fillColor = gui.addColor(options, 'fillColor')
        gui.add(options, 'fill', true, false)
        gui.add(options, 'line', true, false)
        gui.add(options, 'lineWidth', 1, 20)
        gui.add(options, 'lineClose', true, false)
        gui.add(options, 'lineDash', true, false)
        gui.add(options, 'simplify', 0, 10)
        gui.add(options, 'flatten', 0, 40)
        gui.add(options, 'smooth', true, false)
        gui.add(options, 'back')
        gui.add(options, 'blendMode',
            ['normal', 'multiply', 'screen', 'overlay', 'soft-light',
                'hard- light', 'color-dodge', 'color-burn', 'darken',
                'lighten', 'exclusion', 'hue', 'saturation',
                'luminosity', 'color', 'add', 'subtract', 'average', 'pin-light',
                'negation', 'source- over', 'source-in', 'source-out', 'source-atop',
                'destination-over', 'destination-in', 'destination-out',
                'destination-atop', 'lighter', 'darker', 'copy', 'xor'])
        gui.add(options, 'outlinePrev', true, false)
        gui.add(options, 'clear')
        gui.add(options, 'download_png')
        gui.add(options, 'download_svg')
        lineColor.onChange(function (v) {
            window.localStorage.lineColor = JSON.stringify(v)
        })
        fillColor.onChange(function (v) {
            window.localStorage.fillColor = JSON.stringify(v)
        })
    }
    monit()

    return options
})()

    ;
var path
var error

function onMouseDown(event) {
    path = new Path()
    path.blendMode = options.blendMode
    path.strokeWidth = options.line ? options.lineWidth : 1
    if (options.line) {
        path.strokeColor =
            'rgb(' + options.lineColor[0] + ',' + options.lineColor[1] + ',' + options.lineColor[2] + ')'
    } else {
        path.strokeColor = 'rgba(100, 100, 100)'
    }
    error = event.point
    if (options.outlinePrev) path.selection = true
    if (options.lineDash) path.dashArray = [10 * options.lineWidth, 12 * options.lineWidth]
    path.add(event.point)
}

function onMouseDrag(event) {
    path.add(event.point)
}

function onMouseUp(event) {
    path.add(event.point)
    if (options.lineClose) path.closed = true
    if (event.point.x == error.x && event.point.y == error.y && path.segments.length < 3) {
        return
    }
    if (options.simplify) {
        path.simplify(options.simplify)
    }
    if (options.flatten) {
        path.flatten(options.flatten)
    }
    if (options.smooth) {
        path.smooth()
    }
    if (options.line) {

    } else {
        path.strokeColor = null
    }
    if (options.fill) {
        path.fillColor = 'rgb(' + options.fillColor[0] + ',' + options.fillColor[1] + ',' + options.fillColor[2] + ')'
    }
    path.selection = false
    paths.push(path)
    console.log(paths)
};
function anime() {
    paths.forEach(function (e) {
        e.segments.forEach(function (ele) {
            ele.point += new Point(sn.noise2D(ele.point._x / 10, 100),
            sn.noise2D(ele.point._y / 10, 100))
        })
    })
}

function onFrame() {
    anime()
}