let simplexNoise = new SimplexNoise()
let time = 1
threeSetting.setBgColor('#B0E7DA')

function updateVertices() {
    
    geometry.vertices.map(vector => {
        vector.copy(vector._o)
        var perlin = simplexNoise.noise3D(
            (vector.x * 0.006) + (time * 0.0002),
            (vector.y * 0.006) + (time * 0.0003),
            (vector.z * 0.006)
        );
        var ratio = (perlin / 4 + 0.8);
        vector.multiplyScalar(ratio);
    })
    time += 10
    geometry.verticesNeedUpdate = true;
}

function setup() {
    light = new THREE.HemisphereLight(0xffffff, 0x0C056D, 0.6);
    scene.add(light);

    light = new THREE.DirectionalLight(0x590D82, 0.5);
    light.position.set(200, 300, 400);
    scene.add(light);

    geometry = new THREE.IcosahedronGeometry(120, 4)
    for (var i = 0; i < geometry.vertices.length; i++) {
        var vector = geometry.vertices[i];
        vector._o = vector.clone();
    }
    material = new THREE.MeshPhongMaterial({
        emissive: 0x23f660,
        emissiveIntensity: 0.4,
        shininess: 0
    });

    shape = new THREE.Mesh(geometry, material)
    scene.add(shape)
}

function draw(a) {
    if (!geometry) return
    updateVertices()
}