
let opacity = 0.8
class Particle {

    constructor(x, y) {
        this.x = x || floor(random() * width)
        this.y = y || floor(random() * height)
        this.v = random(1, 10)
        this.vx = random(1, 10)
        this.vy = random(1, 10)
        this.c = baseImageData[floor(this.x) + floor(this.y) * width]
        this.o = 255
    }

    magic(poles) {
        let dists = []
        let totalGravity = 0
        poles.map(ele => {
            const d = dist(this.x, this.y, ele.x, ele.y)
            dists.push({ d: d, g: ele.gravity })
            totalGravity += ele.gravity > 0 ? ele.gravity : 0
        })
        const distsA = dists.filter(ele => ele.g >= 0)
        if (distsA.some(ele => ele.d < random(0, 10))) {
            // this.x = floor(random(0, width))
            // this.y = floor(random(0, height))
            // let c = baseImageData[floor(this.x) + floor(this.y) * width]
            // this.c = c && `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${opacity})`
        }
        else {
            let x, y
            dists.map((ele, i) => {
                if (ele.g < 0) ele.g = ele.g / ele.d * 60
                else ele.g = ele.g / ele.d * 260
                const d = ele.g / totalGravity / ele.d
                x = poles[i].x - this.x
                y = poles[i].y - this.y
                this.x += x * d
                this.y += y * d
            })
            let c = baseImageData[floor(this.x) + floor(this.y) * width]
            // let v = c && c[3] / 50 || 0.2
            // this.x += cos(v) * 2
            // this.y += sin(v) * 2
            if (!c || !c[0]) return
            if (c[0] < 30) {
                this.c = [0, 0, 0, this.o]
                this.o = 255
            }
            else if (c[0] > 30 && random() > 0.99) {
                this.o = 255
                this.c = c && [255, 255, 255, this.o]
            }
            else if (c[0] > 30 && random() > 0.1) {
                this.o -= 2
                if (!this.c||!this.c[3]) return
                this.c[3] = this.o
            }
            else {
                this.o -= 2
                // this.c = [0, 0, 0, this.o]
            }
        }

        if (this.x >= width || this.x <= 0) {
            // this.x = random(0, width)
            // let c = baseImageData[floor(this.x) + floor(this.y) * width]
            // this.c = c && `rgba(${c[0]}, ${c[1]}, ${c[2]}, 1)`
        }
        if (this.y >= height || this.y <= 0) {
            // this.y = random(0, height)
            // let c = baseImageData[floor(this.x) + floor(this.y) * width]
            // this.c = c && `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${opacity})`
        }
    }

    draw(poles) {
        if (poles.length > 0) this.magic(poles)
        fill(this.c || 0)
        ellipse(this.x, this.y, 1, 1)
    }

}