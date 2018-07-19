
let pars = []
let poles = []
let sn = new SimplexNoise()
let baseImageData = []

function preload() {
    img2 = loadImage('./10.jpg');
}


function setup() {
    c = createCanvas(1000, 1000)
    ctx = c.drawingContext
    ctx.shadowBlur=8
    ctx.shadowColor="rgba(0,0,0,0.1)"
    // noLoop()
    // background(0)
    fill(0)
    noStroke()
    var canvas = document.getElementById('canvas')
    var ctx = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height
    var img = new Image()
    img.crossOrigin = "anonymous"
    img.src = './9.jpg'
    img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height)
        image(img2,0,0,width,height)
        let originData = Array.from(ctx.getImageData(0, 0, width, height).data)
        for (let i = 0; i < (originData.length / 4); i++) {
            baseImageData[i] = []
            for (let y = 0; y < 3; y++) {
                baseImageData[i].push(originData[i * 4 + y])
            }
            baseImageData[i][3] = Math.round(0.34 * baseImageData[i][0] + 0.5 * baseImageData[i][1] + 0.16 * baseImageData[i][2])
        }
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

    if (keyCode  === 49) {
        poles.push(new Pole(mouseX, mouseY, random(10, 30)))
    }

    else if (keyCode  === 50) {
        poles.push(new Pole(mouseX, mouseY, random(-10, -30)))
    }

    else if (keyCode  === 51) {
        addP()
    }

    else if (keyCode  === 52) {
        addPr()
    }

}
var stop = null
function addP() {

    pars = []
    // poles = []
    clearTimeout(stop)
    stop = null

    for (let i = 0; i < 3; i++) {
        poles.push(new Pole(mouseX + random(0,50), mouseY + random(0, 50), random(-4, -1)))
    }
    for (let i = 0; i < 10; i++) {
        const seed = random(1, 100)
        // rect(mouseX + sin(seed) * 100, mouseY + cos(seed) * 100, 10, 10)
        poles.push(new Pole(mouseX + sin(seed) * 100, mouseY + cos(seed) * 100, random(10, -10)))
    }

    if (stop) return
    stop = setTimeout(() => {
        pars = []
        // poles = []
        clearTimeout(stop)
        stop = null
    }, 5000)

}

function addPr() {

    pars = []
    // poles = []
    clearTimeout(stop)
    stop = null

    for (let i = 0; i < 200; i++) {
        pars.push(new Particle(mouseX + random(-100, 100), mouseY + random(-100, 100)))
    }
    if (stop) return
    stop = setTimeout(() => {
        pars = []
        // poles = []
        clearTimeout(stop)
        stop = null
    }, 5000)

}