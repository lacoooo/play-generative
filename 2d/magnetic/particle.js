
class Particle {

    constructor(x, y) {
        this.x = x || floor(random() * width)
        this.y = y || floor(random() * height)
        this.v = random(1, 10)
        this.vx = random(1, 10)
        this.vy = random(1, 10)
        this.c = baseImageData[floor(this.x) + floor(this.y) * width][3]
    }

    magic(poles) {
        let dists = []
        let totalGravity = 0
        const d = dist(this.x, this.y, poles[0].x, poles[0].y)
        poles.map(ele => {
            dists.push(dist(this.x, this.y, ele.x, ele.y))
            totalGravity += ele.gravity
        })
        if (dists.every(ele => ele > random(1, 40)) && random() < 0.999) {
            let x, y
            dists.map( (ele, i) => {
                ele = poles[i].gravity / totalGravity / (ele * 4) * 4
                x = poles[i].x - this.x
                y = poles[i].y - this.y
                this.x += x * ele
                this.y += y * ele
            })
            let c = baseImageData[floor(this.x) + floor(this.y) * width]
            let v = c&&c[3] / 50 || 0.2
            this.x += sn.noise2D(this.x / 100) * 100 + sin(v) / 3
            this.y += sn.noise2D(this.y / 100) * 100 + cos(v) / 3
            if (random() > 0.9) this.c = c&&c[3]
        } else {
            this.x = floor(random() * width)
            this.y = floor(random() * height)
        }
        if (this.x >= width) this.x = 0
        if (this.y >= height) this.y = 0
    }

    draw(poles) {
        if (poles.length > 0) this.magic(poles)
        fill(this.c || 255)
        ellipse(this.x, this.y, 1.5, 1.5)
    }

}