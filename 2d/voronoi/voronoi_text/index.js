var voronoi = new Voronoi();
var sites = []
var raster = new Raster('img')
var bbox, diagram;
var oldSize = view.size;
var black = new Color('black');
var white = new Color('white')
var mousePos = view.center;
var simplex = new SimplexNoise()
var ee = 0
var index = 0
var final = document.getElementById('canvas')
var save = document.getElementById('save')
onResize();

function onMouseDown(event) {
	renderDiagram();
}

function go() {
	if (index < 100) {
		for (var i = 0; i < 20; i++) {
			var x = Math.floor(Math.random() * 1000)
			var y = Math.floor(Math.random() * 1000)
			var pixel = raster.getPixel(x, y)
			var color = white
			generateBeeHivePoints(x, y, color, pixel.gray);
		}
	} else {
		for (var i = 0; i < 20; i++) {
			sites.shift()
		}
	}

	for (var i = 0; i < sites.length; i++) {
		sites[i].x += (simplex.noise2D(i, ee) - 0.5) * 10
		sites[i].y += (simplex.noise2D(i, ee)) * 5
		if (sites[i].x < 0) sites[i].x = 1000
	}
	ee += 0.001
	renderDiagram();

}

function saveIt() {
	var base64 = final.toDataURL('image/png', 1)
	save.setAttribute('href', base64)
	save.setAttribute('download', index + ".png")
	save.click()
}

setInterval(function () {
	if (index > 200) return
	index++
	go()
	saveIt()
}, 1500)

function renderDiagram() {
	project.activeLayer.children = [];
	var diagram = voronoi.compute(sites, bbox);
	if (diagram) {
		var rectangle = new Rectangle(new Point(0, 0), new Point(1000, 1000));
		var path = new Path.Rectangle(rectangle);
		path.fillColor = black;
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
	point.gray = gray
	points.push(point);
	sites = sites.concat(points)
}

function createPath(points, center) {
	var path = new Path();

	var color = center.color
	path.strokeColor = color
	var gray = raster.getPixel(center.x, center.y).gray
	var width = gray * 6
	path.strokeWidth = width
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
	path.scale(gray + gray * index / 200);
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