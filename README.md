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

## learned about [Texture](https://threejs.org/docs/#api/en/textures/Texture)

- color (or Albedon) Texture
  - <br /><img width="900" alt="Spoke" src="./docs-img/19.png"><br/>
  - EX: <br /><img width="900" alt="Spoke" src="static\textures\door\color.jpg"><br/>
- Alpha Texture
  - <br /><img width="900" alt="Spoke" src="./docs-img/20.png"><br/>
  - EX: <br /><img width="900" alt="Spoke" src="./static\textures\door\alpha.jpg"><br/>
- Height (or Displacement) Texture
  - <br /><img width="900" alt="Spoke" src="./docs-img/21.png"><br/>
  - EX: <br /><img width="900" alt="Spoke" src="./static/textures/door/height.jpg"><br>
- Normal Texture
  - <br /><img width="900" alt="Spoke" src="./docs-img/22.png"><br/>
  - EX: <br /><img width="900" alt="Spoke" src="./static/textures/door/normal.jpg"><br>
- Ambient Occlusion Texture
  - <br /><img width="900" alt="Spoke" src="./docs-img/23.png"><br/>
  - EX: <br /><img width="900" alt="Spoke" src="./static/textures/door/ambientOcclusion.jpg"><br>
- Meatless Texture
  - <br /><img width="900" alt="Spoke" src="./docs-img/24.png"><br/>
  - EX: <br /><img width="900" alt="Spoke" src="./static/textures/door/metalness.jpg"><br>
- Roughness Texture
  - <br /><img width="900" alt="Spoke" src="./docs-img/25.png"><br/>
  - EX: <br /><img width="900" alt="Spoke" src="./static/textures/door/roughness.jpg"><br>

Above are the most used type of Texture and those follow PBR

What is PBR
<br /><img width="900" alt="Spoke" src="./docs-img/26.png"><br>

blog link regarding this

https://marmoset.co/posts/physically-based-rendering-and-you-can-too/

https://marmoset.co/posts/basic-theory-of-physically-based-rendering/

## How to Load Textures

- Loading image (This process will work for our webpack setup)

  - We will put all of our image in our `static` folder
  - in ths case we can access our resource like

    ```js
    const imgSource = "/image.pmg";
    console.log(imgSource);
    ```

  - load image

    ```js
    const image = new Image();
    image.onload(() => {
      console.log("image loader");
    });
    image.src = "/textures/door/alpha.jpg";
    ```

  - load image texture

    ```js
    /** load image texture*/

    const image = new Image();
    const texture = new THREE.Texture(image);
    image.onload(() => {
      console.log("image loader");
      texture.needsUpdate = true; // texture will bee updated because of this command
    });
    image.src = "/textures/door/alpha.jpg";
    /**
     * Object
     */
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    console.log(geometry.attributes);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    ```

  - Use texture Loader

    ```js
    const textureLoader = new THREE.TextureLoader();
    const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
    ```

  - We can use bellow callback to debug texture Loader issue

    ```js
    const textureLoader = new THREE.TextureLoader(loadingManager);
    const colorTexture = textureLoader.load(
      "/textures/minecraft.png",
      () => {
        console.log("textureLoader: loading finished");
      },
      () => {
        console.log("textureLoader: loading progressing");
      },
      () => {
        console.log("textureLoader: loading error");
      }
    );
    ```

  - how to use loadingManager, it can be use to manage different type of loader

    ```js
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onStart = () => {
      console.log("loadingManager: loading started");
    };
    loadingManager.onLoad = () => {
      console.log("loadingManager: loading finished");
    };
    loadingManager.onProgress = () => {
      console.log("loadingManager: loading progressing");
    };
    loadingManager.onError = () => {
      console.log("loadingManager: loading error");
    };
    const textureLoader = new THREE.TextureLoader(loadingManager);
    const colorTexture = textureLoader.load("/textures/minecraft.png");
    ```

## UV unwrapping

It defines how the texture is rapping the Geometry

<br /><img width="900" alt="Spoke" src="./docs-img/26.png"><br/>

visual example:-

<br /><img width="900" alt="Spoke" src="./docs-img/27.png"><br/>
<br /><img width="900" alt="Spoke" src="./docs-img/29.png"><br/>

you can check uv object by logging `console.log(geometry.attributes.uv)`

<br /><img width="900" alt="Spoke" src="./docs-img/30.png"><br/>

## Reansforming The Texture

you can check generateMipmaps, offset, repeat and soon in the video to get batter idea `time stamp  00:40:20 -  00:29:40`

- repeat

  - <br /><img width="900" alt="Spoke" src="./docs-img/31.png"><br/>
  - <br /><img width="900" alt="Spoke" src="./docs-img/32.png"><br/>
  - <br /><img width="900" alt="Spoke" src="./docs-img/33.png"><br/>

- OffSet

  - <br /><img width="900" alt="Spoke" src="./docs-img/34.png"><br/>
  - <br /><img width="900" alt="Spoke" src="./docs-img/35.png"><br/>

- repeat and OffSet
  - <br /><img width="900" alt="Spoke" src="./docs-img/36.png"><br/>
  - <br /><img width="900" alt="Spoke" src="./docs-img/37.png"><br/>
  - <br /><img width="900" alt="Spoke" src="./docs-img/38.png"><br/>

## Filtering and Mip-maping

time stamp 00:29:40 - 1:02:00

<br /><img width="900" alt="Spoke" src="./docs-img/39.png"><br/>

<br /><img width="900" alt="Spoke" src="./docs-img/40.png"><br/>
<br /><img width="900" alt="Spoke" src="./docs-img/41.png"><br/>

Minafication Filter

- <br /><img width="900" alt="Spoke" src="./docs-img/42.png"><br/>
- <br /><img width="900" alt="Spoke" src="./docs-img/43.png"><br/>
- <br /><img width="900" alt="Spoke" src="./docs-img/44.png"><br/>

Texcher ForMate And Optimization

<br /><img width="900" alt="Spoke" src="./docs-img/45.png"><br/>

- Wight
  - <br /><img width="900" alt="Spoke" src="./docs-img/46.png"><br/>
- the size
  - <br /><img width="900" alt="Spoke" src="./docs-img/47.png"><br/>
  - <br /><img width="900" alt="Spoke" src="./docs-img/48.png"><br/>
- data

  - <br /><img width="900" alt="Spoke" src="./docs-img/49.png"><br/>
  - <br /><img width="900" alt="Spoke" src="./docs-img/50.png"><br/>
  - <br /><img width="900" alt="Spoke" src="./docs-img/51.png"><br/>
  - <br /><img width="900" alt="Spoke" src="./docs-img/52.png"><br/>
  - <br /><img width="900" alt="Spoke" src="./docs-img/53.png"><br/>

Where to find texture

- <br /><img width="900" alt="Spoke" src="./docs-img/54.png"><br/>
