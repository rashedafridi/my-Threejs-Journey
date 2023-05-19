# Three.js Journey

## we created a webpack Server for three js local development

## Setup

Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

```bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

## learned about [Light](https://threejs.org/docs/index.html?q=light#)

check the code

<img width="900" alt="Spoke" src="./docs-img/137.png"><br/>


## different Type of light

- [AmbientLight](https://threejs.org/docs/index.html?q=light#api/en/lights/AmbientLight)
    - <img width="900" alt="Spoke" src="./docs-img/136.png"><br/>
    - <img width="900" alt="Spoke" src="./docs-img/138.png"><br/>
    - <img width="900" alt="Spoke" src="./docs-img/139.png"><br/>
- [DirectionalLight](https://threejs.org/docs/index.html?q=light#api/en/lights/DirectionalLight)
    - <img width="900" alt="Spoke" src="./docs-img/140.png"><br/>
    - <img width="900" alt="Spoke" src="./docs-img/141.png"><br/>
    - <img width="900" alt="Spoke" src="./docs-img/142.png"><br/>
- [HemisphereLight](https://threejs.org/docs/index.html?q=light#api/en/lights/HemisphereLight)
    - <img width="900" alt="Spoke" src="./docs-img/143.png"><br/>
    - <img width="900" alt="Spoke" src="./docs-img/144.png"><br/>
    - <img width="900" alt="Spoke" src="./docs-img/145.png"><br/>
    - <img width="900" alt="Spoke" src="./docs-img/146.png"><br/>

- [PointLight](https://threejs.org/docs/index.html?q=light#api/en/lights/PointLight)
    - <img width="900" alt="Spoke" src="./docs-img/147.png"><br/>
    - <img width="900" alt="Spoke" src="./docs-img/148.png"><br/>
    - <img width="900" alt="Spoke" src="./docs-img/149.png"><br/>
    - <img width="900" alt="Spoke" src="./docs-img/150.png"><br/>
    - <img width="900" alt="Spoke" src="./docs-img/151.png"><br/>
- [RectAreaLight](https://threejs.org/docs/index.html?q=light#api/en/lights/RectAreaLight)
    - <img width="900" alt="Spoke" src="./docs-img/152.png"><br/>
    - <img width="900" alt="Spoke" src="./docs-img/153.png"><br/>
    - <img width="900" alt="Spoke" src="./docs-img/154.png"><br/>
    - <img width="900" alt="Spoke" src="./docs-img/155.png"><br/>
- [SpotLight](https://threejs.org/docs/index.html?q=light#api/en/lights/SpotLight)
    - <img width="900" alt="Spoke" src="./docs-img/156.png"><br/>
    - <img width="900" alt="Spoke" src="./docs-img/157.png"><br/>



<img width="900" alt="Spoke" src="./docs-img/158.png"><br/>
<img width="900" alt="Spoke" src="./docs-img/159.png"><br/>
<img width="900" alt="Spoke" src="./docs-img/161.png"><br/>
<img width="900" alt="Spoke" src="./docs-img/164.png"><br/>




Baking 

- <img width="900" alt="Spoke" src="./docs-img/162.png"><br/>

<br/><img width="900" alt="Spoke" src="./docs-img/163.png"><br/>

```js
// Helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)
window.requestAnimationFrame(() =>
{
    spotLightHelper.update()
})

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)
```