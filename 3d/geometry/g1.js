let simplexNoise = new SimplexNoise()
let time = 1
threeSetting.setBgColor(`rgba(200,200,200,1)`)
let boxes = []
function updateVertices() {

    boxes.map(b => {
        b.position = JSON.parse(JSON.stringify(b._o))
        b.rotation = JSON.parse(JSON.stringify(b._r))
        var perlin = simplexNoise.noise3D(
            (b.position.x * 0.002) + (time * 0.006),
            (b.position.y * 0.002),
            (b.position.z * 0.002)
        )
        var ratio = perlin / 200
        b.position.multiplyScalar(ratio + 1)
        b.rotation.x += perlin / 4
        // b.scale.y += perlin / 40
    })
    time += 1
}

function setup() {
    light = new THREE.HemisphereLight(`rgba(200,200,200,1)`, `rgba(10,10,10,1)`, 0.3);
    scene.add(light);

    light = new THREE.DirectionalLight(`rgba(30,30,30,1)`, 0.3);
    light.position.set(200, 300, 400);
    scene.add(light);

    material = new THREE.MeshPhongMaterial({
        emissive: `rgba(10,10,10,1)`,
        emissiveIntensity: 0.2,
        shininess: 0
    });

    geometry = new THREE.IcosahedronGeometry(100, 4)
    for (var i = 0; i < geometry.vertices.length; i++) {
        var v = geometry.vertices[i];
        v._o = v.clone();

        let box = new THREE.BoxGeometry(6, 1, 6)
        let shape = new THREE.Mesh(box, material)
        shape.position.x = v.x
        shape.position.y = v.y
        shape.position.z = v.z
        shape._o = JSON.parse(JSON.stringify(shape.position))
        shape._r = JSON.parse(JSON.stringify(shape.rotation))
        scene.add(shape)
        boxes.push(shape)
    }

}

function draw(a) {
    if (!geometry) return
    updateVertices()
}