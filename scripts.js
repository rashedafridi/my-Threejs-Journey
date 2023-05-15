 console.log("three js is hard for me")
 console.log(THREE) // check the object

 // canvas, three.js will going to create our object on this canvas
 const canvas = document.querySelector("canvas.webgl");

 //sizes
const sizes ={
    width:800,
    height:600
}

// scene
const scene = new THREE.Scene()

// object
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshBasicMaterial({color:"#ff0000"})

const cubeMash = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cubeMash)

//Camera
const Camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
Camera.position.z = 3
// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, Camera)