
let pars = []
let poles = []
let sn = new SimplexNoise()
let baseImageData = []

function preload() {
    img = loadImage('./1.jpg')
    img2 = loadImage('./2.jpg')
}


function setup() {
    c = createCanvas(1000, 1000)
    ctx = c.drawingContext
    ctx.shadowBlur = 8
    ctx.shadowColor = "rgba(0,0,0,0.05)"
    fill(0)
    noStroke()
    var canvas = document.getElementById('canvas')
    var ctx = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height
    ctx.drawImage(img.canvas, 0, 0, width, height)
    image(img2, 0, 0, width, height)
    let originData = Array.from(ctx.getImageData(0, 0, width, height).data)
    for (let i = 0; i < (originData.length / 4); i++) {
        baseImageData[i] = []
        for (let y = 0; y < 3; y++) {
            baseImageData[i].push(originData[i * 4 + y])
        }
        baseImageData[i][3] = Math.round(0.34 * baseImageData[i][0] + 0.5 * baseImageData[i][1] + 0.16 * baseImageData[i][2])
    }

}
function draw() {
    // fill(`rgba(255, 255, 255, 0.002)`)
    // rect(0, 0, width, height)

    pars.map(ele => {
        ele.draw(poles)
    })

}

function keyPressed() {
    console.log(keyCode)

    if (keyCode === 49) {
        addPoles(10, true)
    }

    else if (keyCode === 50) {
        addPoles(4, false)
    }

    else if (keyCode === 51) {
        addParticles()
    }

}
var stop = null

function addPoles(num = 4, type = true) {

    if (type) {
        for (let i = 0; i < num; i++) {
            const seed = random(1, 100)
            poles.push(new Pole(mouseX + sin(seed) * 100, mouseY + cos(seed) * 100, random(5, 20)))
        }
    }

    else {
        for (let i = 0; i < num; i++) {
            const seed = random(1, 100)
            poles.push(new Pole(mouseX + sin(seed) * 30, mouseY + cos(seed) * 30, random(-10, -40)))
        }
    }

}

function addParticles() {

    pars = []
    clearTimeout(stop)
    stop = null

    for (let i = 0; i < 200; i++) {
        pars.push(new Particle(mouseX + random(-100, 100), mouseY + random(-100, 100)))
    }
    if (stop) return
    stop = setTimeout(() => {
        pars = []
        clearTimeout(stop)
        stop = null
    }, 10000)

}