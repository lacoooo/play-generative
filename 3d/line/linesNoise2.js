;
let log = console.log
let simplex = new SimplexNoise()

let colors = colorPalettes[Math.round(Math.random() * colorPalettes.length)]

let geometry = new THREE.Geometry()
var baseImageData = []
let materials = []
let radius = 100, theta = 0
threeSetting.setCamera(true)

size = 20

function getBgColor() {
    const index = Math.round(Math.random() * colors.length)
    const color = colors[index]
    colors.splice(index, 1)
    return color
}

threeSetting.setBgColor(getBgColor())

function setup() {
    parentTransform = new THREE.Object3D()
    let direction = new THREE.Vector3()
    const rate = 20
    const scale = 200
    const time = 300
    for (let i = 0; i < time; i++) {
        for (let j = 0; j < time; j++) {
            for (let o = 0; o < time; o++) {

                const boom = simplex.noise3D(i / scale, j / scale, o / scale) * rate
                if (boom > 10) {
                    geometry.vertices.push(
                        { x: i, y: j, z: o }
                    )
                }

            }
        }
    }
    let object = new THREE.Line(
        geometry,
        new THREE.MeshBasicMaterial({
            color: '#000'
        }
        ))
    parentTransform.add(object)
    parentTransform.position.x -= time / 2
    parentTransform.position.y -= time / 2
    parentTransform.position.z -= time / 2
    scene.add(parentTransform)
}

function draw() {
    // parentTransform.rotation.y += 0.01
}