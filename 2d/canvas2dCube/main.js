{       
var simplex = new SimplexNoise()

class Coptions {
    constructor(w, h) {
        this.w = w || window.innerWidth
        this.h = h || window.innerHeight
        this.cw = Math.floor(this.w / 2)
        this.ch = Math.floor(this.h / 2)
    }
}

var co = new Coptions(1000, 1000)

window.cubes = []

class Vect {
    constructor (x, y, z, l) {
        this.x = x
        this.y = y
        this.z = z
        this.l = l
    }

    get2dPos() {
        return {
            x: 0
        }
    }
}

class Cube {
    constructor (length) {
        this.l = length
        this.vectors = []
        this.initVectors()
    }
    initVectors () {
        this.vectors.push(new Vect(1, 1, 1, this.l))
        this.vectors.push(new Vect(1, -1, 1, this.l))
        this.vectors.push(new Vect(1, 1, -1, this.l))
        this.vectors.push(new Vect(1, -1, -1, this.l))

        this.vectors.push(new Vect(-1, 1, 1, this.l))
        this.vectors.push(new Vect(-1, -1, 1, this.l))
        this.vectors.push(new Vect(-1, 1, -1, this.l))
        this.vectors.push(new Vect(-1, -1, -1, this.l))
    }
    draw () {
        for (var i = 0; i < this.vectors.length - 1; i ++) {
            push()
            translate(width / 2, height / 2)
            line(this.vectors[i].x, this.vectors[i].y, this.vectors[i + 1].x, this.vectors[i + 1].y)
            pop()
        }
    }
}

window.setup = () => {
    createCanvas(co.w, co.h)
    background(200)
    cubes.push(new Cube(100))
    cubes[0].draw()
}

window.draw = () => {

}
}
