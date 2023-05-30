import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

const bricksColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const bricksAmbientOcclusionTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const bricksNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const bricksRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);

const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
const grassAmbientOcclusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);

/**
 * code to repeat texture
 */

grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

/**
 * house
 */
const house = new THREE.Group();
scene.add(house);

// walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughness: bricksRoughnessTexture,
  })
);
walls.castShadow = true;
walls.position.y = 1.25;
walls.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
house.add(walls);
/**
 * roof
 */

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof.rotation.y = Math.PI * 0.25;
roof.position.y = 2.5 + 0.5;
house.add(roof);

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorMetalnessTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);
// door light

const doorLight = new THREE.PointLight("#ff7d46", 1, 7);

doorLight.castShadow = true;
doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;
doorLight.position.set(0, 2.2, 2.7);
house.add(doorLight);

// Bushes

const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bush = [
  new THREE.Mesh(bushGeometry, bushMaterial),
  new THREE.Mesh(bushGeometry, bushMaterial),
  new THREE.Mesh(bushGeometry, bushMaterial),
  new THREE.Mesh(bushGeometry, bushMaterial),
];
bush[0].position.set(0.8, 0.2, 2.2);
bush[0].scale.set(0.5, 0.5, 0.5);
bush[0].castShadow = true;

bush[1].position.set(1.4, 0.04, 2.1);
bush[1].scale.set(0.25, 0.25, 0.25);
bush[1].castShadow = true;

bush[2].position.set(-0.8, 0.1, 2.2);
bush[2].scale.set(0.4, 0.4, 0.4);
bush[2].castShadow = true;

bush[3].position.set(-1, 0.05, 2.6);
bush[3].scale.set(0.15, 0.15, 0.15);
bush[3].castShadow = true;

house.add(...bush);

/**
 * Graves
 */
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.1);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#727272" });

for (let i = 0; i < 70; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 4 + Math.random() * 6;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);

  grave.castShadow = true;

  grave.position.set(x, 0.3, y);

  grave.rotation.x = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  graves.add(grave);
}

/**
 * floor
 */

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);
floor.receiveShadow = true;
floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);
/**
 * light
 */

const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.3);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
moonLight.castShadow = true;
moonLight.shadow.mapSize.width = 256;
moonLight.shadow.mapSize.height = 256;
moonLight.shadow.camera.far = 15;
moonLight.position.set(4, 5, -2);
gui
  .add(moonLight, "intensity")
  .min(0)
  .max(1)
  .step(0.001)
  .name("moonLight intensity");
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

/**
 * ghosts
 */

const ghosts = [
  new THREE.PointLight("#ff00ff", 3, 3),
  new THREE.PointLight("#00ffff", 3, 3),
  new THREE.PointLight("#ff7800", 3, 3),
  new THREE.PointLight("#f0f0ff", 3, 3),
];
ghosts[0].castShadow = true;
ghosts[0].shadow.mapSize.width = 256;
ghosts[0].shadow.mapSize.height = 256;
ghosts[0].shadow.camera.far = 5;

ghosts[1].castShadow = true;
ghosts[1].shadow.mapSize.width = 256;
ghosts[1].shadow.mapSize.height = 256;
ghosts[1].shadow.camera.far = 7;

ghosts[2].castShadow = true;
ghosts[2].shadow.mapSize.width = 256;
ghosts[2].shadow.mapSize.height = 256;
ghosts[2].shadow.camera.far = 10;

ghosts[3].castShadow = true;
ghosts[3].shadow.mapSize.width = 256;
ghosts[3].shadow.mapSize.height = 256;
ghosts[3].shadow.camera.far = 7;


// scene.add(new THREE.PointLightHelper( ghosts[0], 1 ))
// scene.add(new THREE.PointLightHelper( ghosts[1], 1 ))
// scene.add(new THREE.PointLightHelper( ghosts[2], 1 ))
// scene.add(new THREE.PointLightHelper( ghosts[3], 1 ))

scene.add(...ghosts);

const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = localStorage.getItem("cameraX") || 4;
camera.position.y = localStorage.getItem("cameraY") || 2;
camera.position.z = localStorage.getItem("cameraZ") || 5;
scene.add(camera);
// store camera position on every 60 frame
let frameCountInterval = 0;
const storeCameraPosition = () => {
  frameCountInterval++;
  const oldX = localStorage.getItem("cameraX");
  const oldY = localStorage.getItem("cameraY");
  const oldZ = localStorage.getItem("cameraZ");
  if (
    (frameCountInterval > 60 && oldX !== camera.position.x) ||
    oldY !== camera.position.y ||
    oldZ !== camera.position.Z
  ) {
    localStorage.setItem("cameraX", camera.position.x);
    localStorage.setItem("cameraY", camera.position.y);
    localStorage.setItem("cameraZ", camera.position.z);
  }
};

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor("#262837");
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //ghost movement
  const ghost0Angle = elapsedTime * 0.5;
  ghosts[0].position.set(
    Math.cos(ghost0Angle) * 4,
    
    Math.sin(elapsedTime * 3),
    Math.sin(ghost0Angle) * 4
  );
  const ghost1Angle = elapsedTime * 0.32;
  ghosts[1].position.set(
    Math.cos(ghost1Angle) * 5,
   
    Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5),
    Math.sin(ghost1Angle) * 5
  );
  const ghost2Angle = elapsedTime * 0.9;
  ghosts[2].position.set(
    Math.cos(ghost2Angle) * (6 + Math.sin(elapsedTime * 0.32)),
    
    Math.sin(elapsedTime * 3),
    Math.sin(ghost2Angle) * (6 + Math.sin(elapsedTime * 0.3)),
  );
  const ghost3Angle = elapsedTime * 0.18;
  ghosts[3].position.set(
    Math.cos(ghost3Angle) * (7+ Math.sin(elapsedTime * 0.32)),
    
    Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5),
    Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.3)),
  );

  //update controls
  controls.update();

  // render
  renderer.render(scene, camera);
  // store current camera position
  storeCameraPosition();
  // call tic agin on the next frame
  window.requestAnimationFrame(tick);
};

tick();
