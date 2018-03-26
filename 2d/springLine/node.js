var Node = function (x, y) {
  this.x = x || 0
  this.y = y || 0
  this.radius = 200; // Radius of impact
  this.damping = 0.5;
  this.velocity = myp5.createVector();
  this.pVelocity = myp5.createVector();
  this.maxVelocity = 10;
}

Node.prototype = Object.create(p5.Vector.prototype);

Node.prototype.attractNodes = function (nodeArray) {
  for (var i = 0; i < nodeArray.length; i++) {
    var otherNode = nodeArray[i];
    // Stop when empty
    if (otherNode === undefined) break;
    // Continue from the top when node is itself
    if (otherNode === this) continue;
    this.attract(otherNode);
  }
}

Node.prototype.attract = function (otherNode) {
  var thisNodeVector = myp5.createVector(this.x, this.y);
  var otherNodeVector = myp5.createVector(otherNode.x, otherNode.y);
  // 两点间距离
  var d = thisNodeVector.dist(otherNodeVector);

  // 距离小于当前半径
  if (d < this.radius) {
    
    var s = myp5.pow(d / this.radius, options.rate);
    var f = s * 9 * options.strength * (1 / (s + 1) + ((s - 3) / 4)) / d;
    var df = thisNodeVector.sub(otherNodeVector);
    df.mult(f || 0);

    if (!options.direct || options.direct == 'all') {
      otherNode.velocity.x += df.x;
      otherNode.velocity.y += df.y;
    }
    else if (options.direct == 'x') {
      otherNode.velocity.x += df.x;
    }
    else if (options.direct == 'y') {
      otherNode.velocity.y += df.y;
    }
  }
}

Node.prototype.update = function () {
  this.velocity.limit(this.maxVelocity);

  this.x += this.velocity.x;
  this.y += this.velocity.y;

  this.velocity.mult(0);
}