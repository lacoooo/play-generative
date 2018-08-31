let simplexNoise = new SimplexNoise()
let time = 0

var options = (() => {

    class Options {
        constructor() {
            this.x = 0
            this.y = 0
            this.z = 0
            this.px = 0
            this.py = 0
            this.pz = 0
        }
    }

    var options = new Options()

    var gui = new dat.GUI()

    gui.add(options, 'x', 0, 2)
    gui.add(options, 'y', 0, 2)
    gui.add(options, 'z', 0, 2)

    gui.add(options, 'px', -200, 200)
    gui.add(options, 'py', -200, 200)
    gui.add(options, 'pz', -200, 200)

    return options

})()

threeSetting.setBgColor(`rgba(200,200,200,1)`)
// threeSetting.setCamera(true)

let boxes = []
function updateVertices() {
    shape.rotation.x = options.x
    shape.rotation.y = options.y
    shape.rotation.z = options.z
    
    shape2.rotation.x = options.x
    shape2.rotation.y = options.y
    shape2.rotation.z = options.z

    light.position.x = options.px
    light.position.y = options.py
    light.position.z = options.pz

    geometry.vertices.map(v => {
        v.copy(v._o)
        var perlin = simplexNoise.noise3D(
            (v.x * 0.03) + time,
            (v.y * 0.03),
            (v.z * 0.03)
        )
        // var ratio = (perlin / 20 + 1)
        // v.multiplyScalar(ratio)
        v.z = perlin * 10
    })

    time += 0.004
    geometry.verticesNeedUpdate = true;
}

function setup() {
    light = new THREE.HemisphereLight(`rgba(255,255,255,1)`, `rgba(210,210,210,1)`, 0.7)
    scene.add(light)

    light = new THREE.DirectionalLight(`rgba(220,220,220,1)`, 0.6)
    light.position.set(options.px, options.py, options.pz)
    scene.add(light)

    material = new THREE.MeshPhongMaterial({
        emissive: `rgba(150,150,150,1)`,
        emissiveIntensity: 0.1,
        flatShading: true,
        shininess: 0
    })

    geometry = new THREE.PlaneGeometry(100, 100, 12, 12)
    for (var i = 0; i < geometry.vertices.length; i++) {
        var v = geometry.vertices[i]
        // v.z = 100
        v._o = v.clone()
    }
    shape = new THREE.Mesh(geometry, material)
    shape.position.z = 40
    scene.add(shape)

    material2 = new THREE.MeshPhongMaterial({
        color: `rgba(180,180,180,1)`,
        emissive: `rgba(20,20,20,1)`,
        emissiveIntensity: 0.1,
        // flatShading: true,
        shininess: 0
    })

    geometry2 = new THREE.PlaneGeometry(100, 100, 8, 8)
    shape2 = new THREE.Mesh(geometry2, material2)
    shape2.position.z = 0
    scene.add(shape2)

}

function draw(a) {
    if (!shape) return
    updateVertices()
}