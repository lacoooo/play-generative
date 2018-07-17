
class Particle {

    constructor(x, y) {
        this.x = x || floor(random() * width)
        this.y = y || floor(random() * height)
        this.v = random(1, 10)
        this.vx = random(1, 10)
        this.vy = random(1, 10)
    }

    magic(poles) {
        let dists = []
        let totalGravity = 0
        poles.map(ele => {
            const d = dist(this.x, this.y, ele.x, ele.y)
            dists.push({d: d, g: ele.gravity})
            totalGravity += abs(ele.gravity)
        })
        const distsA = dists.filter(ele => ele.g >= 0)
        if (distsA.some(ele => ele.d < random(1, 40))) {
            this.x = floor(random() * width)
            this.y = floor(random() * height)
        }
        else {
            let x, y
            dists.map( (ele, i) => {
                ele.d = ele.g / totalGravity / (ele.d / 2) * 4
                x = poles[i].x - this.x
                y = poles[i].y - this.y
                this.x += x * ele.d
                this.y += y * ele.d
            })
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