;
let log = console.log
let simplexNoise = new SimplexNoise()

let colors = colorPalettes[Math.round(Math.random() * colorPalettes.length)]

let geometry = new THREE.Geometry()
let materials = []
let radius = 100, theta = 0


threeSetting.setBgColor(getBgColor())

function getBgColor() {
    const index = Math.round(Math.random() * colors.length)
    const color = colors[index]
    colors.splice(index, 1)
    return color
}

function getMaterials() {
    colors.map((ele, i) => {
        const m = new THREE.MeshBasicMaterial(
            { 
                color: new THREE.Color(colors[i])
            }
        )
        materials.push(m)
    })
}

function getMaterial() {
    return materials[Math.round(Math.random() * materials.length)]
}

function setup() {
    getMaterials()
    let direction = new THREE.Vector3()
    let rate = 1
    let scale = 20
    for (let i = 0; i < 80; i++) {
        geometry.vertices.push(
            direction.clone(),
        )
        direction.x += simplexNoise.noise3D( i / scale, 0, 0) * rate
        direction.y += simplexNoise.noise3D(0, i / scale, 0) * rate
        direction.z += simplexNoise.noise3D(0, 0, i / scale) * rate
    }
    parentTransform = new THREE.Object3D()
    let rotaR = 10
    let pos = 1000
    for (let i = 0; i < 2000; i++) {
        let object = new THREE.Line(geometry, getMaterial())
        object.rotation.x = simplexNoise.noise3D(i / pos, 0, 0) * rotaR
        object.rotation.y = simplexNoise.noise3D(0, i / pos, 0) * rotaR
        object.rotation.z = simplexNoise.noise3D(0, 0, i / pos) * rotaR
        parentTransform.add(object)
    }
    scene.add(parentTransform)
}

function draw() {
    parentTransform.children.map( (ele, index) => {
        ele.rotation.z += 0.002
    })
    
}
