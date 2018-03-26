;
let log = console.log
let simplexNoise = new SimplexNoise()

let colors = colorPalettes[Math.round(Math.random() * colorPalettes.length)]

var baseImageData = []
let materials = []
let radius = 100, theta = 0
threeSetting.setCamera(true)

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
canvas.width = 80
canvas.height = 80
var img = new Image()
img.crossOrigin = "anonymous"
img.src = './1.jpg'
img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    let originData = Array.from(ctx.getImageData(0, 0, canvas.width, canvas.height).data)
    for (let i = 0; i < (originData.length / 4); i++) {
        baseImageData[i] = []
        for (let y = 0; y < 3; y++) {
            baseImageData[i].push(originData[i * 4 + y])
        }
    }
    setTimeout(() => {
        setup()
    }, 1000);
}

threeSetting.setBgColor(getBgColor())

function getBgColor() {
    const index = Math.round(Math.random() * colors.length)
    const color = colors[index]
    colors.splice(index, 1)
    return color
}

function getLinePosition(avac) {
    let geometry = new THREE.BoxGeometry(1, 1, 1 )
    let direction = new THREE.Vector3()
    let rate = 1
    let scale = 100
    for (let i = 0; i < 4; i++) {
        geometry.vertices.push(
            direction.clone(),
        )
        direction.z += avac / 10
    }
    return geometry
}
var parentTransform = {children: []}
function setup() {
    parentTransform = new THREE.Object3D()
    for (let i = 0; i < canvas.height; i++) {
        for (let j = 0; j < canvas.width; j++) {
            const color = baseImageData[i * canvas.height + j]
            const avac = (255 - (color[0] + color[1] + color[2]) / 3) / 10

            let object = new THREE.Line(getLinePosition(avac), 
            new THREE.MeshBasicMaterial({
                color: new THREE.Color(`rgb(${color[0]},${color[1]},${color[2]})`),
            })
        )
            object.position.x -= j / 10 - canvas.width / 2
            object.position.y -= i / 10 - canvas.height / 2
            object.position.z += avac
            parentTransform.add(object)
        }
    }
    scene.add(parentTransform)
}

function draw() {
        parentTransform.children.map((ele, index) => {
            ele.rotation.z += 0.1
        })
}