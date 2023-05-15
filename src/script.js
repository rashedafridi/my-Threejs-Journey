import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Base
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Animate
 */
//---------------
// let time =Date.now()

// const tick = () =>
// {
//     //time
//     const currentTime = =Date.now()
//     const deltaTime = currentTime - time
//     time = currentTime

//     //update object
//     mesh.rotation.y += 002 * deltaTime
//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()
//-------------
// const clock = new THREE.Clock()

// const tick = () =>
// {
//     const elapsTime = clock.getElapsedTime();

//     //ogject update
//     // mesh.position.y = elapsTime * Math.PI * 2 // half rotation on each second

//     mesh.position.y = Math.sin(elapsTime)
//     mesh.position.y = Math.cos(elapsTime)

//     camera.position.y = Math.cos(elapsTime)
//     camera.position.y = Math.sin(elapsTime)
//     camera.lookAt(mesh.position)
//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()
//--------------
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.to(mesh.position, { duration: 1, delay: 1, y:1 })
gsap.to(mesh.position, { duration: 1, delay: 1, x: -2 })
//gsap.to(mesh.position, { duration: 1, delay: 1, y: -1 })

const tick = () =>
{
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()