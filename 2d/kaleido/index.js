;

var Kaleidos = function (canvas, opts) {
  var isCanvas = /canvas/i.test(Object.prototype.toString.call(canvas))
  if (!isCanvas) throw new TypeError('first param is not canvas')

  var context = this.context = canvas.getContext('2d')

  opts = {
    className: 'kaleidos',
    offsetRotation: 0,
    offsetRotation: 0,
    offsetX: 0,
    offsetY: 0,
    radius: document.body.clientWidth / 4,
    slices: 80,
    zoom: 0.4,
    ease: 0.1,
    style: false,
    src: image
  }
  opts.slices = opts.slices % 2 ? opts.slices + 1 : opts.slices

  // these need to be exposed
  this.offsetX = opts.offsetX
  this.offsetY = opts.offsetY
  this.offsetRotation = opts.offsetRotation
  this.canvas = canvas
  this.className = opts.className
  this.radius = opts.radius
  this.slices = opts.slices
  this.style = opts.style

  this.initialize = function () {
    if (opts.style) {
      canvas.style.marginLeft = -opts.radius + 'px'
      canvas.style.marginTop = -opts.radius + 'px'
    }
    if (this.className) canvas.setAttribute('class', this.className)
    canvas.width = canvas.height = opts.radius * 2
    context.fillStyle = context.createPattern(opts.src, 'repeat')
    this.draw()
  }

  this.draw = function () {
    const step = (Math.PI * 2) / this.slices
    const cx = opts.src.width / 2
    const width = opts.src.width || opts.src.videoWidth
    const height = opts.src.height || opts.src.videoHeight
    const scale = opts.zoom * (opts.radius / Math.min(width, height))
    for (let i = 0; i < this.slices; i++) {
      context.save()
      context.translate(this.radius, this.radius)
      context.rotate(i * step)
      context.beginPath()
      context.moveTo(-0.5, -0.5)
      context.arc(0, 0, this.radius, step * -0.51, step * 0.51)
      context.lineTo(0.5, 0.5)
      context.closePath()
      context.rotate(Math.PI / 2)
      context.scale(scale, scale)
      context.scale([-1, 1][i % 2], 1)
      context.translate(this.offsetX - cx, this.offsetY)
      context.rotate(this.offsetRotation)
      context.scale(opts.offsetScale, opts.offsetScale)
      context.fill()
      context.restore()
    }
  }

  return this
}

const image = new Image()
image.src = 'https://i.pinimg.com/564x/15/b8/fe/15b8fece5961d89759e99933812d4100.jpg'
const canvas = document.createElement('canvas')
const options = {
  src: image,
  radius: document.body.clientWidth / 1.6,
  offsetX: 0,
  offsetY: 0,
  offsetRotation: 0,
  slices: Math.round(Math.random() * 20) + 4,
  ease: 0.1
}
const kaleidos = new Kaleidos(canvas, options)
var tx = options.offsetX
var ty = options.offsetY
var tr = options.offsetRotation

function onmousemoved (event) {
  var dx = event.pageX / window.innerWidth
  var dy = event.pageY / window.innerHeight
  if (event.type === 'touchmove') {
    if (event.touches.length === 1) {
      var touch = event.touches[0]
      dx = touch.clientX / window.innerWidth
      dy = touch.clientY / window.innerHeight
    }
  }
  var hx = dx - 0.5
  var hy = dy - 0.5
  tx = hx * kaleidos.radius * -2
  ty = hy * kaleidos.radius * 2
  return
}

const render = function () {
  var delta = tr - kaleidos.offsetRotation
  var theta = Math.atan2(Math.sin(delta), Math.cos(delta))
  kaleidos.offsetX += (tx - kaleidos.offsetX) * options.ease
  kaleidos.offsetY += (ty - kaleidos.offsetY) * options.ease
  kaleidos.offsetRotation += (theta - kaleidos.offsetRotation) * options.ease
  kaleidos.draw()
  requestAnimationFrame(render)
}

window.addEventListener('mousemove', onmousemoved)
window.addEventListener('touchmove', onmousemoved)
image.addEventListener('load', function () {
  document.body.appendChild(kaleidos.canvas)
  kaleidos.initialize()
})
render()
console.log(kaleidos)
