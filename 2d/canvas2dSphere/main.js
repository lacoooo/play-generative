{

    class Coptions {
        constructor(w, h) {
            this.w = w || window.innerWidth
            this.h = h || window.innerHeight
            this.cw = Math.floor(this.w / 2)
            this.ch = Math.floor(this.h / 2)
        }
    }
    
    var co = new Coptions(600, 600)
    
    class Vect {
        constructor (radius) {
            this.radius = radius
            this.frame = 0
            this.pers = 0.2
            this.rotation = {
                x: 0, y: 0
            }
        }
    
        get pos () {
            let x =
            Math.sin( this.rotation.x * Math.PI / 180 ) * this.radius
            * (1 - Math.sin(this.rotation.y * Math.PI / 180))
            let y =
            Math.sin(this.rotation.y * Math.PI / 180) * this.radius
            let z =
            Math.cos( this.rotation.x * Math.PI / 180 ) * this.radius
            * (1 - Math.sin(this.rotation.y * Math.PI / 180))
            x = x - x * this.pers + x * this.pers * z / this.radius
            y = y - y * this.pers + y * this.pers * z / this.radius
            return {
                x, y, z
            }
        }
    
        update(rotation) {
            this.rotation = rotation
            this.frame ++
        }
    }
    
    class Sphere {
        constructor (radius) {
            this.radius = radius
            this.vectors = []
            this.rotation = {
                x: 0,
                y: 0
            }
            this.vectors.push(new Vect(this.radius))
        }
        draw () {

            push()
            translate(width / 2, height / 2)
            ellipse(0, 0, 5, 5)
            this.rotation = {
                x: mouseX,
                y: mouseY
            }
            this.vectors.forEach(vect => {
                vect.update(this.rotation)
                ellipse(vect.pos.x, vect.pos.y, 10, 10)
            })
            pop()
        }
    }
    
    window.setup = () => {
        createCanvas(co.w, co.h)
        fill(0)
        window.sphere = new Sphere(100)
    }
    
    window.draw = () => {
        background('rgba(200,200,200,1)')
        window.sphere.draw()
    }
}
    