let simplexNoise = new SimplexNoise()
let time = 0
threeSetting.setBgColor(`rgba(220,220,220,1)`)
let boxes = []
function updateVertices() {

    boxes.map(b => {
        b.position = {
            x: b._o.x,
            y: b._o.y,
            z: b._o.z
        }
        b.position.multiplyScalar = b._o.multiplyScalar
        b.rotation = {x: 0, y: 0, z: 0}
        var perlin = simplexNoise.noise3D(
            (b.position.x * 0.002) + time,
            (b.position.y * 0.002) + time,
            (b.position.z * 0.002) + time
        )
        // perlin *= perlin
        b.position.multiplyScalar(perlin / 1000 + 1)
        b.rotation.x += perlin / 40
        b.rotation.y += perlin / 40
        b.rotation.z += perlin / 40
    })
    time += 0.001
}

function setup() {
    light = new THREE.HemisphereLight(`rgba(255,255,255,1)`, `rgba(210,210,210,1)`, 0.6);
    scene.add(light);

    light = new THREE.DirectionalLight(`rgba(240,240,240,1)`, 0.5);
    light.position.set(200, 300, 400);
    scene.add(light);

    material = new THREE.MeshPhongMaterial({
        emissive: `rgba(150,150,150,1)`,
        emissiveIntensity: 0.1,
        shininess: 0
    });

    geometry = new THREE.IcosahedronGeometry(80, 4)
    for (var i = 0; i < geometry.vertices.length; i++) {
        var v = geometry.vertices[i];

        let box = new THREE.BoxGeometry(10, 0.6, 2)
        let shape = new THREE.Mesh(box, material)

        shape.position.x = v.x
        shape.position.y = v.y
        shape.position.z = v.z
        shape._o = {
            x: shape.position.x,
            y: shape.position.y,
            z: shape.position.z
        }
        shape._o.multiplyScalar = shape.position.multiplyScalar
        var same
        boxes.map(ele => {
            if (ele.position.x == shape.position.x &&
            ele.position.y == shape.position.y &&
            ele.position.z == shape.position.z) same = true
        })
        if (same) continue
        scene.add(shape)
        boxes.push(shape)
    }

}

function draw(a) {
    if (!geometry) return
    updateVertices()
}