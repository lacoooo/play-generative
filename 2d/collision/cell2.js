
function Ball(radius, position, vector) {
	this.radius = radius;
	this.point = position;
	this.vector = vector;
	this.maxVec = 15;
	this.numSegment = Math.floor(radius / 30 + 2);
	this.boundOffset = [];
	this.sidePoints = [];
	this.path = new Path({
		fillColor: 'black',
		blendMode: 'xor'
	});
	// this.path.opacity = 0.1
	// this.path.selection = true

	for (var i = 0; i < this.numSegment; i++) {
		this.boundOffset.push(this.radius);
		this.path.add(new Point());
		this.sidePoints.push(new Point({
			angle: 360 / this.numSegment * i,
			length: 1
		}));
	}
}

Ball.prototype = {
	iterate: function () {
		// this.checkBorders();

		var size = view.size;
		if (this.point.x < -this.radius) {
			this.point.x = size.width + this.radius;
		} else if (this.point.x > size.width + this.radius) {
			this.point.x = -this.radius;
		} else if (this.point.y < -this.radius) {
			this.point.y = size.height + this.radius;
		} else if (this.point.y > size.height + this.radius) {
			this.point.y = -this.radius;
		} else if (this.vector.length > this.maxVec) {
			this.vector.length = this.maxVec;
		}

		this.point += this.vector / 4;
		this.updateShape();
	},

	updateShape: function () {
		var segments = this.path.segments;
		for (var i = 0; i < this.numSegment; i++) {
			segments[i].point = this.getSidePoint(i);
		}

		this.path.smooth();
		for (var i = 0; i < this.numSegment; i++) {
			if (this.boundOffset[i] > this.radius / 4) {
				this.boundOffset[i] = this.radius / 4;
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
		var dist = this.point.getDistance(b.point);
		// 如果没有重叠
		if (dist < this.radius + b.radius) {
			// 重叠尺寸
			var overlap = this.radius + b.radius - dist;
			// 方向
			var direc = (this.point - b.point).normalize(overlap * 0.015);
			this.vector -= direc / 40;
			b.vector += direc / 40;

			this.calcBounds(b);
			b.calcBounds(this);
		}
	},

	getBoundOffset: function (b) {
		// 对方中心点和边上当前点的距离
		var diff = this.point - b;
		// 对方中心点到当前边上点的反方向
		var angle = (diff.angle + 180) % 360;
		return this.boundOffset[Math.floor(angle / 360 * this.boundOffset.length)];
	},

	calcBounds: function (b) {
		for (var i = 0; i < this.numSegment; i++) {
			// 边上的当前点
			var tp = this.getSidePoint(i);
			var bLen = b.getBoundOffset(tp);
			// 当前点和对方中心距离
			var td = tp.getDistance(b.point);
			if (td < bLen) {
				this.boundOffset[i] -= (bLen - td) / 2;
			}
		}
	},

	getSidePoint: function (index) {
		return this.point + this.sidePoints[index] * this.boundOffset[index];
	}
};

//--------------------- main ---------------------

var balls = [];
var numBalls = 30;
for (var i = 0; i < numBalls; i++) {
	var position = Point.random() * view.size;
	var vector = new Point({
		angle: 360 * Math.random(),
		length: Math.random() * 1
	});
	var radius = Math.random() * 60 + 200;
	balls.push(new Ball(radius, position, vector));
}

function onMouseDown() {
	anime()
	setInterval(function () {
		anime()
	}, 800)

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