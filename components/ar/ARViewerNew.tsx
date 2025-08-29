'use client';

import { Suspense, useEffect, useState, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, useGLTF } from '@react-three/drei';
import { XR, ARButton, useXR, XRButton } from '@react-three/xr';
import { XRSessionMode } from 'three';

// Extend Three.js types
declare module 'three' {
  interface Object3D {
    material?: THREE.Material | THREE.Material[];
    geometry?: THREE.BufferGeometry;
  }
}

interface ARViewerProps {
  modelUrl: string;
  backgroundColor?: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  enableRotate?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
  showControls?: boolean;
  showARButton?: boolean;
}

function Model({
  url,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onLoad,
  onError,
}: {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  onLoad?: () => void;
  onError?: (error: Error) => void;
}) {
  const group = useRef<THREE.Group>(null);
  
  const { scene } = useGLTF(url, undefined, undefined, (error) => {
    console.error('Error loading 3D model:', error);
    onError?.(new Error('Failed to load 3D model'));
  });

  useEffect(() => {
    if (scene) {
      // Set up the model
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      onLoad?.();
    }
  }, [scene, onLoad]);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  if (!scene) return null;

  return (
    <group ref={group} scale={scale} position={position} rotation={rotation}>
      <primitive object={scene} />
    </group>
  );
}

function ARScene({
  modelUrl,
  backgroundColor = '#000000',
  scale = 0.1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = true,
  enableZoom = true,
  enablePan = true,
  enableRotate = true,
  showControls = true,
  onLoad,
  onError,
}: Omit<ARViewerProps, 'onClose' | 'showARButton'>) {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const xr = useXR();
  const [isARSupported, setIsARSupported] = useState(false);

  // Set up camera
  useEffect(() => {
    camera.position.set(0, 1.6, 3);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // Auto-rotate controls
  useFrame(() => {
    if (controlsRef.current && autoRotate && !xr.isPresenting) {
      controlsRef.current.update();
    }
  });

  return (
    <>
      <color attach="background" args={[backgroundColor]} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.2} />
      
      <Suspense fallback={null}>
        <Model 
          url={modelUrl}
          scale={scale}
          position={position}
          rotation={rotation}
          onLoad={onLoad}
          onError={onError}
        />
      </Suspense>
      
      {showControls && (
        <OrbitControls
          ref={controlsRef}
          enableZoom={enableZoom}
          enablePan={enablePan}
          enableRotate={enableRotate}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          minDistance={0.5}
          maxDistance={10}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.5}
        />
      )}
      
      <gridHelper args={[10, 10, '#0c4a6e', '#0c4a6e']} rotation={[-Math.PI / 2, 0, 0]} />
    </>
  );
}

export default function ARViewer({
  modelUrl,
  backgroundColor = '#000000',
  scale = 0.1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = true,
  enableZoom = true,
  enablePan = true,
  enableRotate = true,
  onLoad,
  onError,
  onClose,
  showControls = true,
  showARButton = true,
}: ARViewerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isARSupported, setIsARSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Check for WebXR support
  useEffect(() => {
    const checkARSupport = async () => {
      if ('xr' in navigator) {
        try {
          // @ts-ignore - WebXR types might not be available
          const supported = await navigator.xr?.isSessionSupported?.('immersive-ar');
          setIsARSupported(!!supported);
        } catch (err) {
          console.warn('AR not supported:', err);
          setIsARSupported(false);
        }
      } else {
        console.warn('WebXR not supported in this browser');
        setIsARSupported(false);
      }
      setIsMounted(true);
    };
    
    checkARSupport();
  }, []);
  
  const handleLoaded = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);
  
  const handleError = useCallback((err: Error) => {
    console.error('Error in ARViewer:', err);
    setError(err);
    setIsLoading(false);
    onError?.(err);
  }, [onError]);
  
  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/80 text-white">
        <div className="animate-pulse">Initializing AR...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-black/80">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
          aria-label="Close AR Viewer"
        >
          <span className="w-6 h-6">×</span>
        </button>
      )}
      
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-white text-center">
            <div className="w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: '70%' }}
              />
            </div>
            <p className="mt-2 text-sm">Loading 3D model...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-red-500 text-center p-4 bg-black/70 rounded-lg">
            <p className="text-lg font-medium mb-2">Failed to load model</p>
            <p className="text-sm mb-4">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      <div className="w-full h-full">
        <Canvas
          shadows
          camera={{ position: [0, 1.6, 3], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          frameloop="always"
        >
          <ARScene
            modelUrl={modelUrl}
            backgroundColor={backgroundColor}
            scale={scale}
            position={position}
            rotation={rotation}
            autoRotate={autoRotate}
            enableZoom={enableZoom}
            enablePan={enablePan}
            enableRotate={enableRotate}
            onLoad={handleLoaded}
            onError={handleError}
            showControls={showControls}
          />
        </Canvas>
        
        {isARSupported && showARButton && !isLoading && !error && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
            <XRButton
              mode={'immersive-ar' as XRSessionMode}
              sessionInit={{
                optionalFeatures: [
                  'local-floor',
                  'bounded-floor',
                  'hand-tracking',
                  'hit-test',
                  'dom-overlay',
                ],
                domOverlay: { root: document.body },
              }}
              onError={(error) => console.error('AR session error:', error)}
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              View in AR
            </XRButton>
          </div>
        )}
      </div>
    </div>
  );
}
