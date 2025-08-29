'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, useProgress, Html } from '@react-three/drei';
import * as THREE from 'three';

interface ModelLoaderProps {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  onLoaded?: () => void;
  onError?: (error: Error) => void;
  className?: string;
  style?: React.CSSProperties;
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-center">
        <div className="w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm">Loading {Math.round(progress)}%</p>
      </div>
    </Html>
  );
}

function Model({
  url,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onLoaded,
  onError,
}: Omit<ModelLoaderProps, 'className' | 'style'>) {
  const group = useRef<THREE.Group>(null);
  const [error, setError] = useState<Error | null>(null);
  
  const { scene, animations } = useGLTF(url, undefined, undefined, (e) => {
    if (e instanceof Error) {
      console.error('Error loading model:', e);
      setError(e);
      onError?.(e);
    }
  });

  // Handle model loaded
  useEffect(() => {
    if (scene && !error) {
      // Set up the model
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Improve material rendering
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.metalness = 0.5;
            child.material.roughness = 0.5;
            child.material.envMapIntensity = 1;
          }
        }
      });
      
      onLoaded?.();
    }
  }, [scene, error, onLoaded]);

  // Auto-rotate the model
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  if (error) {
    return (
      <Html center>
        <div className="text-red-500 text-center">
          Failed to load model
          <button 
            onClick={() => window.location.reload()}
            className="block mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </Html>
    );
  }

  return (
    <group ref={group} dispose={null}>
      <primitive 
        object={scene} 
        scale={scale}
        position={position}
        rotation={rotation}
      />
    </group>
  );
}

export default function ModelLoader({
  url,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onLoaded,
  onError,
  className = '',
  style = {},
}: ModelLoaderProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return (
      <div className={`bg-gray-900 rounded-lg flex items-center justify-center ${className}`} style={style}>
        <div className="text-white">Loading model...</div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full rounded-lg overflow-hidden ${className}`} style={style}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.2} />
        
        <Suspense fallback={<Loader />}>
          <Model 
            url={url}
            scale={scale}
            position={position}
            rotation={rotation}
            onLoaded={onLoaded}
            onError={onError}
          />
        </Suspense>
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

// Preload models for better performance
ModelLoader.preload = (url: string) => {
  // This will be handled by the useGLTF hook internally
  // We're just providing the type definition here
  return url;
};
