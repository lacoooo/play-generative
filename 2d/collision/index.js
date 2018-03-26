var simplex = new SimplexNoise()
var qx = 0
var qy = 100
var colors =
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

function Ball(radius, position, vector, smooth) {
	this.radius = radius;
	this.point = position;
	this.vector = vector;
	this.smooth = smooth;
	this.maxVec = 15;
	this.numSegment = Math.floor((radius / (!smooth ? tombola.range(30, 100) : 30)) + 2);
	this.boundOffset = [];
	this.sidePoints = [];
	this.path = new Path({
		fillColor: colors[tombola.range(0, colors.length)],
		// strokeColor: 'black',
		closed: true,
		blendMode: 'normal'
	});
	this.eyes = []
	// this.path.selection = true

	for (var i = 0; i < this.numSegment; i++) {
		this.boundOffset.push(this.radius);
		this.path.add(new Point());
		this.sidePoints.push(new Point({
			angle: 360 / this.numSegment * i,
			length: 1
		}));
	}

	this.produceEyes()
}

Ball.prototype = {
	produceEyes: function () {
		qx += 0.1
		qy += 0.1
		var driftx = simplex.noise2D(qx, 0)
		var drifty = simplex.noise2D(qy, 0)

		var eye = new Path.Circle([20, 20], 20)
		eye.fillColor = 'white';
		var eye2 = new Path.Circle([20 + driftx, 20 + drifty], 14)
		eye2.fillColor = 'black';
		var eye3 = new Path.Circle([80, 20], 20)
		eye3.fillColor = 'white';
		var eye4 = new Path.Circle([80 + driftx, 20 + drifty], 14)
		eye4.fillColor = 'black';
		var eyesGroup = new Group([eye, eye2, eye3, eye4])
		this.eyes = eyesGroup
		this.eyes.position = this.point + [0, -20]
	},

	iterate: function () {
		this.checkBorders();
		var point = this.point

		qx += 0.001
		qy += 0.001
		var driftx = simplex.noise2D(qx, 0)
		var drifty = simplex.noise2D(qy, 0)

		this.eyes.children[1].position = [driftx, drifty]
		this.eyes.children[3].position = [driftx, drifty]
		this.eyes.position = point + [0, -20]
		if (this.vector.length > this.maxVec) {
			this.vector.length = this.maxVec;
		}
		this.point += this.vector / 3;
		this.updateShape();
	},

	// 与画布边缘的距离
	checkBorders: function () {
		var size = view.size;
		var radius = this.radius
		if (this.point.x > size.width - radius) {
			this.point.x = size.width - radius
		} else if (this.point.x < 0 + radius) {
			this.point.x = 0 + radius
		}
		if (this.point.y > size.height - radius) {
			this.point.y = size.height - radius;
		} else if (this.point.y < 0 + radius) {
			this.point.y = 0 + radius
		}
	},

	updateShape: function () {
		var segments = this.path.segments;
		for (var i = 0; i < this.numSegment; i++)
			segments[i].point = this.getSidePoint(i);

		if (this.smooth) this.path.smooth()

		for (var i = 0; i < this.numSegment; i++) {
			if (this.boundOffset[i] > this.radius / 2) {
				this.boundOffset[i] = this.radius / 2
			}
			var next = (i + 1) % this.numSegment;
			var prev = (i > 0) ? i - 1 : this.numSegment - 1;
			var offset = this.boundOffset[i];
			offset += (this.radius - offset) / 15;
			offset += ((this.boundOffset[next] + this.boundOffset[prev]) / 2 - offset) / 3;
			this.boundOffset[i] = offset;
		}
	},

	react: function (b) {
		// 距离
		var dist = this.point.getDistance(b.point) + 200;
		// 如果重叠
		if (dist < this.radius + b.radius) {
			// 重叠尺寸
			var overlap = this.radius + b.radius - dist;
			// 方向
			var direc = (this.point - b.point).normalize(overlap * 0.015);
			this.vector += direc / 6;
			b.vector -= direc / 6;

			this.calcBounds(b);
			b.calcBounds(this);
		}
	},

	calcBounds: function (b) {
		for (var i = 0; i < this.numSegment; i++) {
			// 边上的当前点
			var tp = this.getSidePoint(i);
			var bLen = b.getBoundOffset(tp);
			// 当前点和对方中心距离
			var td = tp.getDistance(b.point);
			if (td < bLen) {
				this.boundOffset[i] -= (bLen - td) / 10;
			}
		}
	},

	getBoundOffset: function (b) {
		// 对方中心点和边上当前点的距离
		var diff = this.point - b;
		// 对方中心点到当前边上点的反方向
		var angle = (diff.angle + 180) % 360;
		return this.boundOffset[Math.floor(angle / 360 * this.boundOffset.length)];
	},

	getSidePoint: function (index) {
		return this.point + this.sidePoints[index] * this.boundOffset[index];
	}
};

//--------------------- main ---------------------

var balls = [];
var numBalls = 40;
for (var i = 0; i < numBalls; i++) {
	var position = Point.random() * view.size;
	var vector = new Point({
		angle: 360 * Math.random(),
		length: 1
	});
	var radius = Math.random() * 60 + 200;
	balls.push(new Ball(radius, position, vector, Math.random() < 0.6));
}

function onMouseDown() {
	anime()

	setInterval(function () {
		anime()
	}, 400)

}

function onFrame() {
	anime()
}

function anime() {
	for (var i = 0; i < balls.length - 1; i++) {
		for (var j = i + 1; j < balls.length; j++) {
			balls[i].react(balls[j]);
		}
	}
	for (var i = 0, l = balls.length; i < l; i++) {
		balls[i].iterate();
	}
}