let simplexNoise = new SimplexNoise()
let time = 0
let lines = []
let boxes = []

threeSetting.setBgColor(`rgba(200,0,0,1)`)
threeSetting.setCamera(true)

var options = (() => {

    class Options {
        constructor() {
            this.x = 0
            this.y = 0
            this.z = 0
            this.px = 48
            this.py = 200
            this.pz = -200
        }
    }

    var options = new Options()

    var gui = new dat.GUI()

    gui.add(options, 'x', -2, 2)
    gui.add(options, 'y', -2, 2)
    gui.add(options, 'z', -2, 2)

    gui.add(options, 'px', -200, 200)
    gui.add(options, 'py', -200, 200)
    gui.add(options, 'pz', -200, 200)

    return options

})()

function updateVertices() {
    shapeL.rotation.x = options.x
    shapeL.rotation.y = options.y
    shapeL.rotation.z = options.z

    shape.rotation.x = options.x
    shape.rotation.y = options.y
    shape.rotation.z = options.z

    group.rotation.x = options.x
    group.rotation.y = options.y
    group.rotation.z = options.z

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
        var perlin2 = simplexNoise.noise3D(
            (v.x * 0.005) + time,
            (v.y * 0.005),
            (v.z * 0.005)
        )
        // var ratio = (perlin / 20 + 1)
        // v.multiplyScalar(ratio)
        v.z = perlin * 15 + perlin2 * 80
    })

    geometryL.vertices.map((v, i) => {
        v.copy(v._o)
        var perlin = simplexNoise.noise3D(
            (v.x * 0.03) + time,
            (v.y * 0.03),
            (v.z * 0.03)
        )
        var perlin2 = simplexNoise.noise3D(
            (v.x * 0.005) + time,
            (v.y * 0.005),
            (v.z * 0.005)
        )
        // var ratio = (perlin / 20 + 1)
        // v.multiplyScalar(ratio)
        v.z = perlin * 15 + perlin2 * 80
        lines[i].geometry.vertices[0].z = v.z + 30
        lines[i].geometry.verticesNeedUpdate = true;
    })

    time += 0.004
    geometry.verticesNeedUpdate = true;
    geometryL.verticesNeedUpdate = true;
}

function setup() {
    light = new THREE.HemisphereLight(`rgba(255,255,255,1)`, `rgba(210,210,210,1)`, 0)
    scene.add(light)

    light = new THREE.DirectionalLight(`rgba(210,210,210,1)`, 0)
    light.position.set(options.px, options.py, options.pz)
    scene.add(light)

    material = new THREE.MeshPhongMaterial({
        emissive: `rgba(0,0,0,1)`,
        emissiveIntensity: 0.2,
        flatShading: true,
        shininess: 0
    })

    geometry = new THREE.PlaneGeometry(500, 500, 80, 80)
    for (var i = 0; i < geometry.vertices.length; i++) {
        var v = geometry.vertices[i]
        // v.z = 100
        v._o = v.clone()
    }
    shape = new THREE.Mesh(geometry, material)
    shape.position.z = 40
    scene.add(shape)

    // shape.visible = false

    geometryL = new THREE.PlaneGeometry(500, 500, 80, 80)
    var materialL = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: false, opacity: 0.5 });
    var lm = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 3 })
    group = new THREE.Group();
    for (var i = 0; i < geometryL.vertices.length; i++) {
        var v = geometryL.vertices[i]
        // v.z = 100
        v._o = v.clone()
        var q = new THREE.Geometry();
        var line = new THREE.Line(q, lm);
        q.vertices.push(new THREE.Vector3(v.x, v.y, 0));
        q.vertices.push(new THREE.Vector3(v.x, v.y, -500));
        if (!(i % 4)) group.add(line)
        lines.push(line)
    }

    scene.add(group)

    shapeL = new THREE.Mesh(geometryL, materialL)
    shapeL.position.z = 70
    scene.add(shapeL)

    // shapeL.visible = false

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
    shape2.visible = false

}

function draw(a) {
    if (!shape) return
    updateVertices()
}