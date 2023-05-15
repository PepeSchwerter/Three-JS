import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

// //add cube to scene
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

//add a plane to the scene
const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
  flatShading: true,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

//alter plane vertices
const array = plane.geometry.getAttribute("position");
for (let i = 0; i < array.count; i++) {
  const x = array.getX(i);
  const y = array.getY(i);
  const z = array.getZ(i);
  array.setXYZ(i, x, y, z + Math.random());
}

//add a directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 0, 1);
scene.add(directionalLight);

camera.position.z = 5;

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

//animate cube
const animate = () => {
  requestAnimationFrame(animate);
  plane.rotation.x += 0.01;
  plane.rotation.y += 0.01;
  renderer.render(scene, camera);
};

document.body.appendChild(renderer.domElement);
animate();
