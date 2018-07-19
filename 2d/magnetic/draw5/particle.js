
class Particle {

    constructor(x, y) {
        this.x = x || floor(random() * width)
        this.y = y || floor(random() * height)
        this.v = random(1, 10)
        this.vx = random(1, 10)
        this.vy = random(1, 10)
        this.c = baseImageData[floor(this.x) + floor(this.y) * width]
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
            let c = baseImageData[floor(this.x) + floor(this.y) * width]
            this.c = c && `rgba(${c[0]}, ${c[1]}, ${c[2]}, 1)`
        }
        else {
            let x, y
            dists.map( (ele, i) => {
                if (ele.g < 0) ele.g = ele.g / ele.d * 60
                else ele.g = ele.g / ele.d * 260
                const d = ele.g / totalGravity / ele.d * 4
                x = poles[i].x - this.x
                y = poles[i].y - this.y
                this.x += x * d
                this.y += y * d
            })
            let c = baseImageData[floor(this.x) + floor(this.y) * width]
            let v = c && c[3] / 50 || 0.2
            this.x += cos(v)
            this.y += sin(v)
            if (random() > 0.95) this.c = c && `rgba(${c[0]}, ${c[1]}, ${c[2]}, 1)`
        }

        if (this.x >= width || this.x <= 0) {
            this.x = random(0, width)
            let c = baseImageData[floor(this.x) + floor(this.y) * width]
            this.c = c && `rgba(${c[0]}, ${c[1]}, ${c[2]}, 1)`
        }
        if (this.y >= height || this.y <= 0) {
            this.y = random(0, height)
            let c = baseImageData[floor(this.x) + floor(this.y) * width]
            this.c = c && `rgba(${c[0]}, ${c[1]}, ${c[2]}, 1)`
        }
    }

    draw(poles) {
        if (poles.length > 0) this.magic(poles)
        fill(this.c || 0)
        ellipse(this.x, this.y, 2.5, 2.5)
    }

}