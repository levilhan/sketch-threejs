const THREE = require('three/build/three.js');
const debounce = require('js-util/debounce');

export default function() {
  const resolution = new THREE.Vector2();
  const canvas = document.getElementById('canvas-webgl');
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: canvas,
  });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 1, 10000);
  const clock = new THREE.Clock();

  //
  // process for this sketch.
  //



  //
  // common process
  //
  const render = () => {
    const time = clock.getDelta();
    renderer.render(scene, camera);
  };
  const renderLoop = () => {
    render();
    requestAnimationFrame(renderLoop);
  };
  const resizeCamera = () => {
    camera.aspect = resolution.x / resolution.y;
    camera.updateProjectionMatrix();
  };
  const resizeWindow = () => {
    resolution.set(document.body.clientWidth, window.innerHeight);
    canvas.width = resolution.x;
    canvas.height = resolution.y;
    resizeCamera();
    renderer.setSize(resolution.x, resolution.y);
  };
  const on = () => {
    window.addEventListener('resize', debounce(resizeWindow), 1000);
  };

  const init = () => {
    renderer.setClearColor(0xeeeeee, 1.0);
    camera.position.set(1000, 1000, 1000);
    camera.lookAt(new THREE.Vector3());

    on();
    resizeWindow();
    renderLoop();
  }
  init();
}