
let pars = []
let poles = []
let sn = new SimplexNoise()
let baseImageData = []
function setup() {
    createCanvas(1000, 1000)
    // noLoop()
    background(255)
    fill(255)
    noStroke()
    var canvas = document.getElementById('canvas')
    var ctx = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height
    var img = new Image()
    img.crossOrigin = "anonymous"
    img.src = './1.jpg'
    img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height)
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

}
var stop = null
function addP() {

    for (let i = 0; i < 200; i++) {
        pars.push(new Particle(mouseX + random(-70, 70), mouseY + random(-70, 70)))
    }
    if (stop) return
    stop = setTimeout(() => {
        pars = []
        stop = null
    }, 10000)

}