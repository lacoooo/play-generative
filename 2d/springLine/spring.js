var Spring = function (fromNode, toNode, length, stiffness, damping) {
  this.fromNode = fromNode
  this.toNode = toNode
}

Spring.prototype.update = function () {
  // 当前点和连接点距离
  var diff = p5.Vector.sub(this.toNode, this.fromNode)
  diff.normalize()
  diff.mult(options.dist || 0)
  var target = p5.Vector.add(this.fromNode, diff)

  var force = p5.Vector.sub(target, this.toNode)
  force.mult(options.stiff || 0)

  this.toNode.velocity.add(force)
  if (options.mode == 'origin') {
    this.fromNode.velocity.add(p5.Vector.mult(force, -1));
  } else if (options.mode == 'fly') {
    this.fromNode.velocity.add(force)
  }
}
