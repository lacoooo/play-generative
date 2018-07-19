
class Particle {

    constructor(x, y) {
        this.x = x || floor(random(0, width))
        this.y = y || floor(random(0, height))
        this.f = random(60, 200)
    }

    magic(poles) {
        let dists = []
        let totalGravity = 0
        poles.map(ele => {
            const d = dist(this.x, this.y, ele.x, ele.y)
            dists.push({d: d, g: ele.gravity})
            totalGravity += ele.gravity > 0 ? ele.gravity : 0
        })
        const distsA = dists.filter(ele => ele.g >= 0)
        if (distsA.some(ele => ele.d < random(0, 10))) {
            this.x = floor(random(0, width))
            this.y = floor(random(0, height))
        }
        else {
            let x, y
            dists.map( (ele, i) => {
                if (ele.g < 0) ele.g = ele.g / ele.d * 60
                else ele.g = ele.g / ele.d * 260
                const d = ele.g / totalGravity / ele.d * 10
                x = poles[i].x - this.x
                y = poles[i].y - this.y
                this.x += x * d
                this.y += y * d
            })
        }
        if (this.x >= width || this.x <= 0) this.x = random(0, width)
        if (this.y >= height || this.y <= 0) this.y = random(0, height)
    }

    draw(poles) {
        if (poles.length > 0) this.magic(poles)
        fill(this.c || 255)
        ellipse(this.x, this.y, 1.5, 1.5)
    }

}