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

var co = new Coptions(600, 600)

window.cubes = []

class Vect {
    constructor (angel, l) {
        this._angel = angel
        this.l = l
        this.frame = 0
    }

    get pos2d () {
        let x = Math.sin(this._angel * Math.PI / 180 - this.frame * 0.01) * this.l
        // * (Math.sin(this._angel * Math.PI / 180 + this.frame * 0.01))
        let y = this.l / Math.sin(45 * Math.PI / 180) * 0.5 * this.index
        // * (1-Math.cos(this._angel * Math.PI / 180 + this.frame * 0.01))
        let z = Math.cos(this._angel * Math.PI / 180 - this.frame * 0.01) * this.l
        x = x * 0.8 + x * z / this.l * 0.2
        y = y * 0.8 + y * z / this.l * 0.2
        return {
            x: x + simplex.noise2D(x / 100, y / 100) * 4,
            y: y + simplex.noise2D(x / 100, y / 100) * 4,
            z: z / this.l
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
        fill('rgba(0,0,0,.2)')
        translate(width / 2, height / 2)
        this.faces.forEach((face) => {
            face.vectors.map(vecoter => vecoter.update())
            face.vectors.reduce((a, b) => {
                strokeWeight(3 * b.pos2d.z + 4)
                drawingContext.setLineDash([5, 15])
                // line(a.pos2d.x, a.pos2d.y, b.pos2d.x, b.pos2d.y)
                beginShape()
                curveVertex(a.pos2d.x, a.pos2d.y)
                curveVertex(a.pos2d.x, a.pos2d.y)
                curveVertex(a.pos2d.x, a.pos2d.y)
                curveVertex(b.pos2d.x, b.pos2d.y)
                curveVertex(b.pos2d.x, b.pos2d.y)
                curveVertex(b.pos2d.x, b.pos2d.y)
                endShape()
                return b
            })
        })
        for(let i = 0; i < 4; i ++) {
            // if (this.faces[0].vectors[i].pos2d.z > 0) {
            //     continue
            // }
            strokeWeight(3 * this.faces[0].vectors[i].pos2d.z + 4)
            // line(this.faces[0].vectors[i].pos2d.x, 
            //     this.faces[0].vectors[i].pos2d.y,
            //     this.faces[1].vectors[i].pos2d.x, 
            //     this.faces[1].vectors[i].pos2d.y)
            beginShape()
            curveVertex(this.faces[0].vectors[i].pos2d.x, 
                this.faces[0].vectors[i].pos2d.y)
            curveVertex(this.faces[0].vectors[i].pos2d.x, 
                this.faces[0].vectors[i].pos2d.y)
            curveVertex(this.faces[0].vectors[i].pos2d.x, 
                this.faces[0].vectors[i].pos2d.y)
            curveVertex(this.faces[1].vectors[i].pos2d.x, 
                this.faces[1].vectors[i].pos2d.y)
            curveVertex(this.faces[1].vectors[i].pos2d.x, 
                this.faces[1].vectors[i].pos2d.y)
            curveVertex(this.faces[1].vectors[i].pos2d.x, 
                this.faces[1].vectors[i].pos2d.y)
            endShape()
        }
        pop()
    }
}

window.setup = () => {
    createCanvas(co.w, co.h)
    // frameRate(3)
    // setInterval(() => {
        cubes.push(new Cube(200 - cubes.length * 5))
    // }, 1000)
    // noLoop()
}

window.draw = () => {
    background('rgba(200,200,200,1)')
    cubes.forEach(cube => {
        cube.draw()
    })
}
}
