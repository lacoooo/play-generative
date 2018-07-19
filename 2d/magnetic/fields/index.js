
let pars = []
let poles = []
let sn = new SimplexNoise()
let baseImageData = []
function setup() {
    createCanvas(1000, 1000)
    // noLoop()
    background(00)
    fill(0)
    noStroke()
    addP()

}
function draw() {
    fill(`rgba(00, 00, 00, 0.02)`)
    rect(0, 0, width, height)

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

}

function addP() {

    for (let i = 0; i < 5000; i++) {
        pars.push(new Particle())
    }

    // setTimeout(() => {
    //     pars = []
    // }, 2000)

}