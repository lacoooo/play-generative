var voronoi = new Voronoi();
var sites = []
var raster = new Raster('img')
var bbox, diagram;
var oldSize = view.size;
var black = new Color('black');
var white = new Color('white')
var mousePos = view.center;
var selected = false;

onResize();

function onMouseDown(event) {
	renderDiagram();
}

function onFrame() {
	for (var i = 0; i < 100; i++) {
		var x = Math.floor(Math.random() * 1000)
		var y = Math.floor(Math.random() * 1000)
		var pixel = raster.getPixel(x, y)
		if (pixel.gray < 0.2 && Math.random() < 0.98) continue
		var color = {
			origin: [x, y],
			destination: [x + tombola.range(-200, 300), y + tombola.range(-300, 100)],
			gradient: {
				stops: [
					new Color(pixel.red, pixel.green, pixel.blue),
					new Color(
						pixel.red + tombola.range(-1, 1),
						pixel.green + tombola.range(-1, 1),
						pixel.blue + tombola.range(-1, 1)
					)
				],
				radial: false
			}
		}
		generateBeeHivePoints(x, y, color, pixel.gray);
	}
}

setInterval(function() {
	renderDiagram();
}, 5000)

function renderDiagram() {
	project.activeLayer.children = [];
	var diagram = voronoi.compute(sites, bbox);
	if (diagram) {
		for (var i = 0, l = sites.length; i < l; i++) {
			var cell = diagram.cells[sites[i].voronoiId];
			if (cell) {
				var halfedges = cell.halfedges,
					length = halfedges.length;
				if (length > 2) {
					var points = [];
					for (var j = 0; j < length; j++) {
						v = halfedges[j].getEndpoint();
						points.push(new Point(v));
					}
					createPath(points, sites[i]);
				}
			}
		}
	}
}

function removeSmallBits(path) {
	var averageLength = path.length / path.segments.length;
	var min = path.length / 50;
	for (var i = path.segments.length - 1; i >= 0; i--) {
		var segment = path.segments[i];
		var cur = segment.point;
		var nextSegment = segment.next;
		var next = nextSegment.point + nextSegment.handleIn;
		if (cur.getDistance(next) < min) {
			segment.remove();
		}
	}
}

function generateBeeHivePoints(i, j, color, gray) {
	var points = [];
	var point = new Point(i, j)
	point.color = color
	point.selected = function() {
		if (gray < 0.04) return true
		else if (gray < 0.08 && Math.random() < 0.3) {
			return true
		}
		return false
	}()
	points.push(point);
	sites = sites.concat(points)
}

function createPath(points, center) {
	var path = new Path();
	if (!center.selected) {
		var color = center.color
		path.fillColor = color
	} else {
		path.fullySelected = true;
	}
	path.closed = true;

	for (var i = 0, l = points.length; i < l; i++) {
		var point = points[i];
		var next = points[(i + 1) == points.length ? 0 : i + 1];
		var vector = (next - point) / 2;
		path.add({
			point: point + vector,
			handleIn: -vector,
			handleOut: vector
		});
	}
	if (tombola.rangeFloat(0, 1) > 0.3) {

		path.scale(0.95);
	} else {
		path.scale(1.1);
	}
	removeSmallBits(path);
	return path;
}

function onResize() {
	var margin = 6;
	bbox = {
		xl: margin,
		xr: view.bounds.width - margin,
		yt: margin,
		yb: view.bounds.height - margin
	};
	for (var i = 0, l = sites.length; i < l; i++) {
		sites[i] = sites[i] * view.size / oldSize;
	}
	oldSize = view.size;
	renderDiagram();
}

function onKeyDown(event) {
	if (event.key == 'space') {
		selected = !selected;
		renderDiagram();
	}
}