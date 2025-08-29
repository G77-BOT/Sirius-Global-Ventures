import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// Initialize loaders with cache
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.5/');
gltfLoader.setDRACOLoader(dracoLoader);

// Model cache
const modelCache = new Map<string, Promise<GLTF>>();

/**
 * Load a 3D model with caching
 */
export async function loadModel(url: string): Promise<GLTF> {
  if (modelCache.has(url)) {
    return modelCache.get(url)!;
  }

  const promise = new Promise<GLTF>((resolve, reject) => {
    gltfLoader.load(
      url,
      (gltf) => resolve(gltf),
      undefined,
      (error) => {
        console.error('Error loading model:', error);
        reject(error);
      }
    );
  });

  modelCache.set(url, promise);
  return promise;
}

/**
 * Normalize model scale and position
 */
export function setupModel(
  model: THREE.Object3D,
  {
    scale = 1,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
  }: {
    scale?: number | [number, number, number];
    position?: [number, number, number];
    rotation?: [number, number, number];
  } = {}
) {
  // Set scale
  if (Array.isArray(scale)) {
    model.scale.set(...scale);
  } else {
    model.scale.set(scale, scale, scale);
  }

  // Set position
  model.position.set(...position);
  
  // Set rotation
  model.rotation.set(...rotation);

  // Traverse and fix materials
  model.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      
      // Ensure materials are an array
      const materials = Array.isArray(mesh.material) 
        ? mesh.material 
        : [mesh.material];
      
      // Apply material properties
      materials.forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          material.roughness = 0.7;
          material.metalness = 0.2;
          material.envMapIntensity = 1;
          material.needsUpdate = true;
        }
      });

      // Enable shadows
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    }
  });

  return model;
}

/**
 * Create a simple 3D box with a texture or color
 */
export function createBox(
  width = 1,
  height = 1,
  depth = 1,
  color: THREE.ColorRepresentation = 0x00ff00,
  textureUrl?: string
): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  
  let material: THREE.Material;
  
  if (textureUrl) {
    const texture = new THREE.TextureLoader().load(textureUrl);
    material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.7,
      metalness: 0.2,
    });
  } else {
    material = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.7,
      metalness: 0.2,
    });
  }
  
  const box = new THREE.Mesh(geometry, material);
  box.castShadow = true;
  box.receiveShadow = true;
  
  return box;
}

/**
 * Create a simple 3D sphere
 */
export function createSphere(
  radius = 0.5,
  widthSegments = 32,
  heightSegments = 32,
  color: THREE.ColorRepresentation = 0x00ff00
): THREE.Mesh {
  const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.5,
    metalness: 0.5,
  });
  
  const sphere = new THREE.Mesh(geometry, material);
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  
  return sphere;
}

/**
 * Create a simple 3D plane
 */
export function createPlane(
  width = 10,
  height = 10,
  color: THREE.ColorRepresentation = 0xffffff,
  textureUrl?: string
): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(width, height);
  
  let material: THREE.Material;
  
  if (textureUrl) {
    const texture = new THREE.TextureLoader().load(textureUrl);
    material = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
      roughness: 0.8,
    });
  } else {
    material = new THREE.MeshStandardMaterial({
      color,
      side: THREE.DoubleSide,
      roughness: 0.8,
    });
  }
  
  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI / 2; // Rotate to be horizontal
  plane.receiveShadow = true;
  
  return plane;
}

/**
 * Create a simple point light with helper
 */
export function createPointLight(
  color: THREE.ColorRepresentation = 0xffffff,
  intensity = 1,
  distance = 10,
  showHelper = false
) {
  const light = new THREE.PointLight(color, intensity, distance);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.normalBias = 0.05;
  
  const group = new THREE.Group();
  group.add(light);
  
  if (showHelper) {
    const helper = new THREE.PointLightHelper(light);
    group.add(helper);
  }
  
  return { light, group };
}

/**
 * Create a simple directional light with helper
 */
export function createDirectionalLight(
  color: THREE.ColorRepresentation = 0xffffff,
  intensity = 1,
  position: [number, number, number] = [5, 5, 5],
  showHelper = false
) {
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(...position);
  light.castShadow = true;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 50;
  
  const group = new THREE.Group();
  group.add(light);
  
  if (showHelper) {
    const helper = new THREE.DirectionalLightHelper(light);
    group.add(helper);
    
    const shadowHelper = new THREE.CameraHelper(light.shadow.camera);
    group.add(shadowHelper);
  }
  
  return { light, group };
}

/**
 * Create a simple ambient light
 */
export function createAmbientLight(
  color: THREE.ColorRepresentation = 0xffffff,
  intensity = 0.5
) {
  return new THREE.AmbientLight(color, intensity);
}

/**
 * Create a simple hemisphere light
 */
export function createHemisphereLight(
  skyColor: THREE.ColorRepresentation = 0xffffff,
  groundColor: THREE.ColorRepresentation = 0x444444,
  intensity = 0.6
) {
  return new THREE.HemisphereLight(skyColor, groundColor, intensity);
}
