;

var log = console.log

var text = '是诸法空相不生不灭不垢不净不增不减是故空中无色无受想行识无眼耳鼻舌身意无色声香味触法无眼界乃至无意识界无无明亦无无明尽乃至无老死亦无老死尽'
var texx = text.split('')
function getText() {
    return texx[Math.floor(Math.random() * text.length)]
}

let points = []

var sketch = function (p) {
    const scale = 800
    const circleSize = 6
    let selectedPoint = null
    function initpoint() {
        let point = new Spring()
        point.x = p.random(-scale, scale) + p.width / 2
        point.y = p.random(-scale, scale) + p.height / 2
        point.text = getText()
        point.textSize = p.floor(p.random() * 20) + 16
        return point
    }

    function initTree(points) {
        for (var j = 0; j < points.length - 1; j++) {
            var r = p.floor(p.random(j + 1, points.length));
            points[j].nextPoint = points[r]
        }
    }

    p.initData = function() {
        points = []
        for (let i = 0; i < 50; i++) {
            points.push(initpoint())
        }
        initTree(points)
    }

    p.setup = function () {
        p.createCanvas(p.windowWidth - 20, p.windowHeight - 20)
        p.initData()
    }

    p.draw = function () {
        p.background(255)
        p.fill(0)

        for (let i = 0; i < points.length; i++) {
            for (let k = 0; k < points.length; k++) {
                if (i == k) continue
                points[i].update(points[k])
                points[i].updateLine()
            }
        }

        p.stroke(0)
        p.strokeWeight(0.1)
        for (let i = 0; i < points.length; i++) {
            const pt = points[i]
            if (pt.nextPoint) {
                p.line(pt.x, pt.y, pt.nextPoint.x, pt.nextPoint.y)
            }
        }

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