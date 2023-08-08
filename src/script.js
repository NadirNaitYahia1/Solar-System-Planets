import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// ... Other imports ...

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const canvas = document.querySelector(".webgl"); // Use correct selector

const scene = new THREE.Scene();
scene.background = new THREE.Color("gray");

const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height);
camera.position.z = 3; // Set camera position
// camera.center()



const controls = new OrbitControls(camera, canvas); // Initialize OrbitControls
const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);

// ... Render your scene ...
const clock = new THREE.Clock();
console.log(clock);

//  Texture and material
const textureLoader = new THREE.TextureLoader();
const color = textureLoader.load("/textures/matcaps/earth.jpg", () => {console.log('loaded')}, () => {console.log('progrees')}, () => {'error'});
const material = new THREE.MeshBasicMaterial();
material.map = color;


const textureLoader2 = new THREE.TextureLoader();
const sun = textureLoader2.load("/textures/matcaps/sun.jpg", () => {console.log('loaded')}, () => {console.log('progrees')}, () => {'error'});
const material2 = new THREE.MeshBasicMaterial();
material2.map = sun;



const textureLoader3 = new THREE.TextureLoader();
const mercuryT = textureLoader2.load("/textures/matcaps/mercury.jpg", () => {console.log('loaded')}, () => {console.log('progrees')}, () => {'error'});
const material3 = new THREE.MeshBasicMaterial();
material3.map = mercuryT;

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(2, 200, 100),
  material
);
earth.position.x = 14;
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(2, 200, 100),
  material3
); 
mercury.position.x = 0;
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(2, 100,100 ),
  material
);
venus.position.x = 7;
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(2, 512, 512),
  material
);
mars.position.x = 21;
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(2, 512, 512),
  material
);
jupiter.position.x = 28;
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(2, 512, 512),
  material
);
saturn.position.x = 35;
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(2, 512, 512),
  material
);
uranus.position.x = 42;
const neptun = new THREE.Mesh(
  new THREE.SphereGeometry(2, 512, 512),
  material
);
neptun.position.x = 49;


const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 700, 772),
  material2
);
scene.add(earth,sphere,mercury, venus ,jupiter, mars ,saturn, uranus); // Add cube to scene

sphere.position.y = 6;
sphere.position.x = -9;
sphere.rotation.x = 0.5;
camera.position.z = 6;
// Camera.lookAt(0,0,0)
// Example render loop
const animate = () => {
  const time = clock.getElapsedTime();
  // console.log(time);
 
  // earth.rotation.x +=Math.cos(time) *  0.01; 
  earth.rotation.y +=  time * 0.0001 *2*Math.PI; 
  jupiter.rotation.y +=  time * 0.001 *2*Math.PI;
  jupiter.position.y =Math.sqrt( Math.pow(sphere.position.x,2) + Math.pow(sphere.position.y,2) ) * Math.sin(time) *0.75*5;
  jupiter.position.x = Math.sqrt( Math.pow(sphere.position.x,2) + Math.pow(sphere.position.y,2) ) * Math.cos(time) *0.75*5; 
  // jupiter.position.z = 2*Math.PI *time;

  // camera.position.z =12
 

  

  requestAnimationFrame(animate);

  // Update controls and render scene
  controls.update();
  renderer.render(scene, camera);
};

animate(); // Start the animation loop
