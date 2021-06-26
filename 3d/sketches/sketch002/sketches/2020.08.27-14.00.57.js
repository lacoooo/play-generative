
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
  window.scene = new THREE.Scene();

  // Setup a geometry
  const geometry = new THREE.IcosahedronBufferGeometry(0.6, 3);

  const edgeGeom = new THREE.EdgesGeometry(geometry)

  // // Setup a material
  // const material = new THREE.MeshBasicMaterial({
  //   color: "red",
  //   wireframe: true
  // });

  const getMaterial = () => {
    // return new THREE.MeshNormalMaterial({flatShading: true})
    return new THREE.ShaderMaterial({
      side: 2,
      uniforms: {
        time: { value: window.time }
      },
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives: enabled;",
      },
      // flatShading: true,
      vertexShader: v,
      fragmentShader: f
    });
  }

  const getMaterialLine = () => {
    // return new THREE.MeshNormalMaterial({flatShading: true})
    return new THREE.ShaderMaterial({
      side: 2,
      uniforms: {
        time: { value: window.time }
      },
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives: enabled;",
      },
      // flatShading: true,
      vertexShader: v,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vColor;
        
        float pi = 3.1415926;
        
        void main() {
        
            vec3 n = normalize(  cross(dFdx(vColor),  dFdy(vColor))  );
            gl_FragColor = vec4(0., 1., 1., 1.);
        }
      `
    });
  }

  // Setup a mesh with geometry + material
  const mesh = new THREE.Mesh(geometry, getMaterial());
  scene.add(mesh);
  // const meshLine = new THREE.LineSegments(edgeGeom, getMaterialLine());
  // scene.add(meshLine);

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
      mesh.material.uniforms.time.value = time
      // meshLine.material.uniforms.time.value = time
      controls.update();
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
