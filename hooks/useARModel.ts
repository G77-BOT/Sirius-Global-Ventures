import { useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function useARModel(url: string) {
  const [model, setModel] = useState<THREE.Object3D | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const loadModel = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    setError(null);
    
    try {
      const loader = new GLTFLoader();
      
      // Load the model with progress tracking
      const gltf = await new Promise<THREE.GLTF>((resolve, reject) => {
        loader.load(
          url,
          (gltf) => resolve(gltf),
          (xhr) => {
            const progress = (xhr.loaded / (xhr.total || 1)) * 100;
            setProgress(progress);
          },
          (error) => reject(error)
        );
      });

      // Extract the model and scale it appropriately
      const loadedModel = gltf.scene;
      loadedModel.scale.set(0.1, 0.1, 0.1);
      loadedModel.position.set(0, 0, 0);
      
      // Enable shadows if the model has meshes
      loadedModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      setModel(loadedModel);
    } catch (err) {
      console.error('Error loading 3D model:', err);
      setError(err instanceof Error ? err : new Error('Failed to load model'));
    } finally {
      setLoading(false);
    }
  }, [url]);

  // Load model when URL changes
  useEffect(() => {
    loadModel();
  }, [loadModel]);

  // Cleanup function to dispose of the model when unmounting
  useEffect(() => {
    return () => {
      if (model) {
        // Dispose of geometries and materials to prevent memory leaks
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((material) => material.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }
    };
  }, [model]);

  return {
    model,
    loading,
    error,
    progress,
    reload: loadModel,
  };
}

export function useARInteraction(model: THREE.Object3D | null) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [scale, setScale] = useState<[number, number, number]>([1, 1, 1]);

  // Apply hover effect
  useEffect(() => {
    if (!model) return;
    
    const targetScale = isHovered ? 1.1 : 1;
    model.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  }, [isHovered, model]);

  // Apply selection effect
  useEffect(() => {
    if (!model) return;
    
    const targetY = isSelected ? 0.5 : 0;
    model.position.y = THREE.MathUtils.lerp(model.position.y, targetY, 0.1);
  }, [isSelected, model]);

  // Update model position, rotation, and scale when they change
  useEffect(() => {
    if (!model) return;
    
    model.position.set(...position);
    model.rotation.set(...rotation);
    model.scale.set(...scale);
  }, [model, position, rotation, scale]);

  const handlePointerOver = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerOut = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleClick = useCallback(() => {
    setIsSelected(!isSelected);
  }, [isSelected]);

  return {
    isHovered,
    isSelected,
    position,
    rotation,
    scale,
    setPosition,
    setRotation,
    setScale,
    handlePointerOver,
    handlePointerOut,
    handleClick,
  };
}
