;

var log = console.log

var textA = [
    '前方到站',
    '前方到站,',
    '世界尽头。',
    '请准备下车的旅客,',
    '排队等候。'
]

let points = []

var sketch = function (p) {
    const scale = 200
    const circleSize = 6
    let selectedPoint = null

    function initpoint(t) {
        let point = new Spring()
        point.x = p.mouseX + p.floor(p.random(-20, 20))
        point.y = p.mouseY + p.floor(p.random(-20, 20))
        point.dist = p.floor(p.random(50))
        point.distLine = p.floor(p.random(80)) + 120
        point.text = t
        point.textSize = p.floor(p.random() * 20) + 22
        return point
    }

    function initTree(points) {
        for (var j = 0; j < points.length - 1; j++) {
            if (p.random() > 0.9) {
                var r = p.floor(p.random(j + 1, points.length));
                points[j].nextPoint = points[r]
            }
            else {
                points[j].nextPoint = points[points.length - 1]
            }
            
        }
    }

    p.initData = function(t) {
        // points = []
        for (let i = 0; i < 1; i++) {
            points.push(initpoint(t))
        }
        initTree(points)
    }

    p.setup = function () {
        p.createCanvas(p.windowWidth - 20, p.windowHeight - 20)
        var index = 0
        setInterval(() => {
            if (index > 4) return
            var i = 0
            setInterval(() => {
                if (index > 4) return
                if (i < textA[index].length) {
                    p.initData(textA[index][i])
                }
                i++
            }, 130)
            index ++
        }, textA[index].length * 170 + 1400)
    }

    p.draw = function () {
        p.background(`rgba(255,255,255,0.5)`)
        p.fill(0)

        for (let i = 0; i < points.length; i++) {
            for (let k = 0; k < points.length; k++) {
                if (i == k) continue
                points[i].update(points[k])
                points[i].updateLine()
            }
        }

        // p.stroke(0)
        // p.strokeWeight(0.1)
        // for (let i = 0; i < points.length; i++) {
        //     const pt = points[i]
        //     if (pt.nextPoint) {
        //         p.line(pt.x, pt.y, pt.nextPoint.x, pt.nextPoint.y)
        //     }
        // }

        p.noStroke()
        p.textFont('宋体')
        for (let i = 0; i < points.length; i++) {
            // p.ellipse(points[i].x, points[i].y, circleSize, circleSize)
            p.textSize(points[i].textSize)
            p.text(points[i].text, points[i].x, points[i].y)
        }

        if (selectedPoint != null) {
            selectedPoint.x = p.mouseX
            selectedPoint.y = p.mouseY
        }
    }

    p.mousePressed = function () {
        var maxDist = 40
        for (var i = 0; i < points.length; i++) {
            var point = points[i]
            var d = p.dist(p.mouseX, p.mouseY, point.x, point.y)
            if (d < maxDist) {
                selectedPoint = point
                maxDist = d
            }
        }
    }

    p.mouseReleased = function () {
        if (selectedPoint != null) {
            selectedPoint = null
        }
    }

}

var myp5 = new p5(sketch)