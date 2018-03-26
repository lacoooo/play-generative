let simplexNoise = new SimplexNoise()
let time = 1
let cubeList = []
threeSetting.setBgColor('#B0E7DA')
threeSetting.setCamera(true)

function updateVertices() {

    cubeList[0].geometry.vertices.map(vector => {
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
    cubeList[0].geometry.verticesNeedUpdate = true;

}

function tweenIt() {
    let x = Math.random() * 1.1
    let y = Math.random() * 1.1
    let z = Math.random() * 1.1
    cubeList.map( (ele, i) => {
        TweenMax.to( ele.mesh.scale, .5, {x: x, y: y, z: z, ease: Power1.easeInOut})
    })
}

function objectProduce() {
    material = new THREE.MeshPhongMaterial({
        emissive: 0x23f660,
        emissiveIntensity: 0.4,
        shininess: 0
    });
    for (let i = 0; i < 15; i++) {
        let geometry = new THREE.BoxGeometry(70, 70, 70)
        let cube = {
            geometry: geometry,
            mesh: new THREE.Mesh(geometry, material)
        }
        if (i == 14) cube.geometry.faces.splice(8, 2)
        cubeList.push(cube)
    }
    cubeList.map((ele, i) => {
        if (i < 5) {
            ele.mesh.position.x = i * 70 - 70 * 2.5
        } else if (i < 10) {
            ele.mesh.position.x = 4 * 70 - 70 * 2.5
            ele.mesh.position.y = (i - 5) * 70
        } else if (i < 14) {
            ele.mesh.position.x = - 70 * 2.5
            ele.mesh.position.z = - (i - 10) * 70
        } else if (i == 14) {
            ele.mesh.position.x = 4 * 70 - 70 * 2.5
            ele.mesh.position.y = 4 * 70
            ele.mesh.position.z = 70
        }
        scene.add(ele.mesh)
    })

}

function setup() {
    light = new THREE.HemisphereLight(0xffffff, 0x0C056D, 0.6);
    scene.add(light);

    light = new THREE.DirectionalLight(0x590D82, 0.5);
    light.position.set(200, 300, 400);
    scene.add(light);

    objectProduce()

    setInterval(()=> {
        tweenIt()
    }, 500)
}

function draw(a) {
    if (!cubeList.length) return
    // updateVertices()
}

