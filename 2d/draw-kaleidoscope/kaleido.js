;
const Kaleido = (function () {
	let showGuideOrNot = true
	return class Kaleido {
		constructor({ container = '#app', segments = 30, strokeWidth = 0.3 }) {
			this.segments = options.segments || segments
			this.strokeWidth = strokeWidth
			this.bgcolor = '#FFF'
			this.container = container

			this.drawing = false
			this.cursor = {}
			this.init()
		}
		init() {
			this.canvas = document.createElement('canvas')
			this.guide = document.createElement('canvas')
			this.canvas.setAttribute('class', 'canvas')
			this.guide.setAttribute('class', 'guide')
			this.guide.style.opacity = showGuideOrNot ? 1 : 0
			this.ctx = this.canvas.getContext("2d")
			this.guidectx = this.guide.getContext("2d")
			this.width = window.innerWidth
			this.height = window.innerHeight
			this.center = { x: this.width / 2, y: this.height / 2 }
			this.canvas.width = this.width
			this.canvas.height = this.height
			this.guide.width = this.width
			this.guide.height = this.height
			this.ctx.lineCap = "round"

			document.querySelector(this.container).appendChild(this.guide)
			document.querySelector(this.container).appendChild(this.canvas)
			this.canvas.addEventListener("mousedown", this.onDown.bind(this))
			this.canvas.addEventListener("mousemove", this.onMove.bind(this))
			this.canvas.addEventListener("mouseup", this.onUp.bind(this))
			this.drawGuide()
		}
		drawGuide() {
			let ctx = this.guidectx
			ctx.clearRect(0, 0, this.width, this.height)

			ctx.lineWidth = 0.5
			ctx.strokeStyle = this.bgcolor === "#FFF" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)"
			ctx.lineCap = "round"

			ctx.save()
			ctx.beginPath()
			ctx.translate(this.center.x, this.center.y)
			if (this.segments % 2 == 1) this.segments ++
			this.segments = Math.floor(this.segments)
			var r = 2 / this.segments * Math.PI

			for (var i = 0; i < this.segments; i++) {
				ctx.rotate(r)
				ctx.moveTo(0, 0)
				ctx.lineTo(0, Math.max(this.width, this.height) * -1)
			}
			ctx.stroke()
			ctx.restore()

		}
		onDown(e) {
			e.stopPropagation()
			e.preventDefault()
			this.drawing = true
			this.cursor.x = this.cursor.lx = e.clientX
			this.cursor.y = this.cursor.ly = e.clientY
		}
		onUp(e) {
			this.drawing = false
		}
		onMove(e) {
			e.stopPropagation()
			e.preventDefault()
			if (!this.drawing) return
			this.ctx.lineWidth = options.lineWidth || this.strokeWidth
			this.ctx.strokeStyle = options.lineColor
			this.cursor.x = e.clientX
			this.cursor.y = e.clientY

			this.render(this.ctx)

			this.cursor.lx = this.cursor.x
			this.cursor.ly = this.cursor.y

		}
		render(ctx) {
			var r = 2 / this.segments * Math.PI
			console.log(this.segments)
			for (var i = 0; i < this.segments; ++i) {
				ctx.save()
				ctx.translate(this.center.x, this.center.y)
				ctx.rotate(r * i)
				if (options.mirror == 'true' && (this.segments % 2 == 0) && i > 0 && i % 2 > 0) {
					ctx.scale(1, -1)
				}
				ctx.beginPath()
				ctx.moveTo(this.cursor.lx - this.width / 2, this.cursor.ly - this.height / 2)
				ctx.lineTo(this.cursor.x - this.width / 2, this.cursor.y - this.height / 2)
				ctx.stroke()
				ctx.closePath()
				ctx.restore()
			}
		}
		delete() {
			document.querySelector(this.container).innerHTML = ''
		}
		showGuide() {
			let o = this.guide.style.opacity
			if (o == undefined || o == '') o = 1
			this.guide.style.opacity = ~~!(o * 1)
			showGuideOrNot = !(o * 1)
		}
	}
}())
