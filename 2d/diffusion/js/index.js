window.addEventListener('resize', resize, false);

var attaches = 0;
var numParticles = 2000;
var activeParticles = 1000;
var particles = [];
var sBins = [];
var grid = [];

var orthoMove = false;

var halfWidth;
var halfHeight;

var spawnRadius = 0;
var killRadius = 5;

var angleMod = .62;

var stepSize = 1;
var speed = 1;

var dirs1 = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0],           [1, 0],
  [-1, 1],  [0, 1],  [1, 1]
]

var dirs2 = [
  [0, -1], [-1, 0], [1, 0], [0, 1]
];

var dirs = dirs1;

function Particle(x, y){
  this.x = floor(x);
  this.y = floor(y);
  this.angle = random()*PI*2;
  this.tick = function(){
    if (orthoMove){
      var i = floor(random()*4);
      this.x += dirs2[i][0]*stepSize;
      this.y += dirs2[i][1]*stepSize;
    } else {
      this.x += cos(this.angle)*stepSize;
      this.y += sin(this.angle)*stepSize;
      this.angle += random()*angleMod - angleMod/2;
    }
    if (this.x < 0) this.x = width-1;
    if (this.x >= width) this.x = 0;
    if (this.y < 0) this.y = height-1;
    if (this.y >= height) this.y = 0;
  }
  this.respawn = function(){
    var spawnAngle = random()*PI*2;
    this.angle = spawnAngle + random()*PI - PI*1.5;
    this.x = cos(spawnAngle)*spawnRadius + width/2;
    this.y = sin(spawnAngle)*spawnRadius + height/2;
  }
}

function setup(){
  createCanvas();
  colorMode(HSB, 360, 100, 100, 100);
  ellipseMode(CENTER);
  resize();
}

function draw(){
  for (var j = 0; j < speed; j++){
    for (var i = 0; i < particles.length; i++){
      if (j == 0){
        stroke(0);
        point(particles[i].x, particles[i].y);
      }
      if (i >= activeParticles) continue;
      particles[i].tick();
      var distance = getDist(particles[i]);
      if (distance > killRadius*killRadius) particles[i].respawn();

      if (isAttached(particles[i])){
        var x = floor(particles[i].x);
        var y = floor(particles[i].y);
        if (x > -1 && y > -1 && x < width && y < height){
          attaches++;
          grid[x][y] = true;
          stroke(floor(45 + frameCount/20)%360, 100, 100);
          point(x, y);
          var dx = abs(x - width/2);
          var dy = abs(y - height/2);
          dist = sqrt(dx*dx + dy*dy);
          if (dist+5 > spawnRadius){
            spawnRadius = dist+5;
            killRadius = spawnRadius + 5;
          }
          particles[i].respawn();
        }
      }
      if (j == speed-1){
        stroke(50);
        point(particles[i].x, particles[i].y);
      }
    }
  }
}

function updateVals(){
  angleMod = document.getElementById("angleSlider").value;
  stepSize = document.getElementById("stepSlider").value;
  speed = document.getElementById("speedSlider").value;
  activeParticles = document.getElementById("particleSlider").value;
  // orthoMove = (angleMod == 6.2);
  speed = floor(speed*(1000/min(max(activeParticles, 100), 1000)));
}

function updateDirs(){
  if (document.getElementById("orthoCheckbox").checked){
    dirs = dirs2;
  } else {
    dirs = dirs1;
  }
}

function isAttached(p){
  for (var i = 0; i < dirs.length; i++){
    var dx = floor(p.x + dirs[i][0]);
    var dy = floor(p.y + dirs[i][1]);
    if (dx > -1 && dy > -1 && dx < width && dy < height){
      if (grid[dx][dy]) return true;
    }
  }
  return false;
}

function getDist(p){
  var dx = p.x - width/2;
  var dy = p.y - height/2;
  return dx*dx + dy*dy;
}

function resize(){
  resizeCanvas(window.innerWidth, window.innerHeight);
  grid = [];
  halfWidth = floor(width/2);
  halfHeight = floor(height/2);
  
  for (var i = 0; i < width; i++){
    grid.push([]);
    for (var j = 0; j < height; j++){
      grid[i].push(false);
    }
  }
  particles = [];
  for (var i = 0; i < numParticles; i++){
    particles.push(new Particle(random()*width, random()*height));
  }
  
  attaches = 0;
  spawnRadius = 2;
  killRadius = 12;
  
  grid[floor(width/2)][floor(height/2)] = true;
  background(0);
}