import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//Colors
const c_background = "#000000"
const c_stars = "0xffffff"

//Scene 
const scene = new THREE.Scene();
scene.background = new THREE.Color(c_background);
//const backgroundTexture = new THREE.TextureLoader().load('src/assets/spacebackground.jpg');
//scene.background = backgroundTexture;

//Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 10;

//Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls(camera, renderer.domElement);

//Objects
//Cube 1
const geometry1 = new THREE.BoxGeometry( 1, 1, 1 );
const material1 = new THREE.MeshBasicMaterial( { color: "#5AECD6" } );
const cube1 = new THREE.Mesh( geometry1, material1 );
scene.add( cube1 );

//Lighting
const pointLight = new THREE.PointLight(0xffffff)
scene.add(pointLight)
pointLight.position.set(9, 10, 0);

//Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);


Array(200).fill().forEach(addStar);


function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: c_stars} )
  const star = new THREE.Mesh( geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
  star.position.set(x, y, z);

  const s = THREE.MathUtils.randFloatSpread(3);
  star.scale.set(s, s, s);

  scene.add(star);
}


function Animate() {
  requestAnimationFrame( Animate );


  controls.update();
  renderer.render( scene, camera );
};

Animate();