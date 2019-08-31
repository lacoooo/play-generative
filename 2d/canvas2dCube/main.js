{       
// var simplex = new SimplexNoise()

class Coptions {
    constructor(w, h) {
        this.w = w || window.innerWidth
        this.h = h || window.innerHeight
        this.cw = Math.floor(this.w / 2)
        this.ch = Math.floor(this.h / 2)
    }
}

var co = new Coptions(600, 600)

window.cubes = []

class Vect {
    constructor (angel, l) {
        this._angel = angel
        this.l = l
        this.frame = 0
    }

    get pos2d () {
        let x = Math.sin(this._angel * Math.PI / 180 + this.frame * 0.01) * this.l
        let y = this.l / Math.sin(45 * Math.PI / 180) * 0.5 * this.index
        let z = Math.cos(this._angel * Math.PI / 180 + this.frame * 0.01) * this.l
        x = x * 0.8 + x * z / this.l * 0.2
        y = y * 0.8 + y * z / this.l * 0.2
        return {
            x, y
        }
    }

    update() {
        this.frame ++
    }
}

class Face {
    constructor (index) {
        this.index = index
        this.vectors = []
    }
    addVect (vector) {
        vector.index = this.index
        this.vectors.push(vector)
    }
}

class Cube {
    constructor (length) {
        this.l = length
        this.faces = []
        this.initFaces()
    }
    initFaces () {
        this.faces.push(new Face(-1))
        this.faces.push(new Face(1))
        
        this.faces[0].addVect(new Vect(0, this.l))
        this.faces[0].addVect(new Vect(90, this.l))
        this.faces[0].addVect(new Vect(180, this.l))
        this.faces[0].addVect(new Vect(270, this.l))
        this.faces[0].addVect(new Vect(0, this.l))

        this.faces[1].addVect(new Vect(0, this.l))
        this.faces[1].addVect(new Vect(90, this.l))
        this.faces[1].addVect(new Vect(180, this.l))
        this.faces[1].addVect(new Vect(270, this.l))
        this.faces[1].addVect(new Vect(0, this.l))
    }
    draw () {
        push()
        translate(width / 2, height / 2)
        this.faces.forEach((face) => {
            face.vectors.map(vecoter => vecoter.update())
            face.vectors.reduce((a, b) => {
                line(a.pos2d.x, a.pos2d.y, b.pos2d.x, b.pos2d.y)
                // text(`${Math.floor(a.pos2d.x)}, ${Math.floor(a.pos2d.y)}`, a.pos2d.x + 4, a.pos2d.y + 4)
                return b
            })
        })
        for(let i = 0; i < 4; i ++) {
            line(this.faces[0].vectors[i].pos2d.x, 
                this.faces[0].vectors[i].pos2d.y,
                this.faces[1].vectors[i].pos2d.x, 
                this.faces[1].vectors[i].pos2d.y)
        }
        pop()
    }
}

window.setup = () => {
    createCanvas(co.w, co.h)
    // frameRate(3)
    cubes.push(new Cube(200))
    // setInterval(() => {
    //     cubes.push(new Cube(150))
    // }, 3000)
    // noLoop()
}

window.draw = () => {
    background(200)
    cubes.forEach(cube => {
        cube.draw()
    })
}
}
