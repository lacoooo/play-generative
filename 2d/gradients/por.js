;
var path
var shape = new Shape.Circle([30, 30], options.size)
shape.fillColor = {
    origin: [options.pos1_X, options.pos1_Y],
    destination: [options.pos2_X, options.pos2_Y],
    gradient: {
        stops: [options.color1, options.color2],
        radial: false
    }
}
var symbol = new Symbol(shape)

function onMouseDown(event) {
    path = new Path()
    pushPoint(event.point)
    shape.size = options.size
    shape.fillColor.gradient.stops = [options.color1, options.color2]
    shape.fillColor.origin = [options.pos1_X, options.pos1_Y]
    shape.fillColor.destination = [options.pos2_X, options.pos2_Y]
    symbol.place(event.point)
}
function onMouseDrag(event) {
    pushPoint(event.point)
    var dp = event.point - event.delta / 2
    symbol.place(dp)
    symbol.place(event.point)

}

function onMouseUp(event) {
    pushPoint(event.point)
    symbol.place(event.point)
    path.simplify(500)
    path.flatten(0.002)
    var points = path.segments
    project.activeLayer.children = []
    points.forEach(function (ele) {
        symbol.place(ele.point)
    })
    setTimeout(function() {
        ctx.drawImage(canvas, 0, 0)
        project.activeLayer.children = []
    }, 100);
}

function pushPoint(point) {
    path.add(point)
}