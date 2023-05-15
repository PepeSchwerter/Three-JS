import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(-10, 30, 30);
controls.update();

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

//add a box to the scene
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(boxMesh);

//add a plane to the scene
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotation.x = -Math.PI / 2;
scene.add(planeMesh);

const gridHelper = new THREE.GridHelper(30, 30);
scene.add(gridHelper);

//a function that rotate the box mesh
const animate = () => {
  boxMesh.rotation.x += 0.01;
  boxMesh.rotation.y += 0.01;
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
