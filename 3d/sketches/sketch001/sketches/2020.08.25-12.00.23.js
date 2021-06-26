
import v from './shader/v.glsl'
import f from './shader/f.glsl'

// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");


const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
  dimensions: [1080, 1920],
  attributes: {
    antialias: true
  }
};

window.time = 0

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("#000", 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(0, 0, -4);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  window.scene = scene

  // Setup a geometry
  // const geometry = new THREE.SphereGeometry(1, 60, 60);
  // const geometry = new THREE.BoxGeometry(1, 1, 1);

  // Setup a material
  // const material = new THREE.MeshBasicMaterial({
  //   color: "black",
  //   wireframe: true
  // });

  const number = 200;
  const points = []
  for (var i = 0; i < number; i++) {
    const p = i / number * 2;
    const x = p * Math.cos(p * Math.PI * 20)
    const y = p * 4 + Math.sin(p * 30)
    const z = p * Math.sin(p * Math.PI * 20)

    points.push(new THREE.Vector3(x, y, z))
  }

  const curve = new THREE.CatmullRomCurve3(points)

  const geometry = new THREE.TubeGeometry(curve, 1000, 0.1, 200, false)

  const getMaterial = () => {
    return new THREE.ShaderMaterial({
      side: 2,
      uniforms: {
        time: { value: window.time }
      },
      vertexShader: v,
      fragmentShader: f,
    });
  }

  // Setup a mesh with geometry + material
  const mesh = new THREE.Mesh(geometry, getMaterial());

  mesh.position.y = -4

  scene.add(mesh);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      window.time = time
      controls.update();
      mesh.material = getMaterial()
      mesh.rotation.y = time;
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
