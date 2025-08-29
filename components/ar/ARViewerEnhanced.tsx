'use client';

import React, { Suspense, useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree, extend, useThree as useThreeFiber } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, PerspectiveCamera, Environment } from '@react-three/drei';
import { XR, ARButton, VRButton, XRButton, useXR } from '@react-three/xr';
import * as THREE from 'three';
import { useAR } from '@/contexts/ARContext';

// Extend Three.js with WebXR types
declare global {
  interface XRSystem {
    isSessionSupported(sessionType: string): Promise<boolean>;
  }
  
  interface Navigator {
    xr?: XRSystem;
  }
}

// Custom XRCanvas component with proper typing
interface XRCanvasProps extends React.PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
  camera?: {
    position?: [number, number, number];
    fov?: number;
    near?: number;
    far?: number;
  };
  dpr?: number | [number, number];
  gl?: Partial<THREE.WebGLRendererParameters>;
  shadows?: boolean;
  frameloop?: 'always' | 'demand' | 'never';
  resize?: { scroll?: boolean; debounce?: number | { scroll: number; resize: number } };
  onCreated?: (state: any) => void;
  onPointerMissed?: (event: MouseEvent) => void;
  events?: (store: any) => any;
  raycaster?: Partial<THREE.Raycaster>;
  performance?: { current: number; min: number; max: number; debounce: number; regress: () => void };
  linear?: boolean;
  flat?: boolean;
  orthographic?: boolean;
  vr?: boolean;
  ar?: boolean;
  arSessionInit?: XRSessionInit;
  webxr?: boolean;
  webxrOptions?: XRSessionInit;
  concurrent?: boolean;
  pixelRatio?: number;
  cameraManual?: boolean;
  disableEvents?: boolean;
  disableAutoClear?: boolean;
  disableRender?: boolean;
  disableErrorHandling?: boolean;
  disableColorManagement?: boolean;
  gl2?: boolean;
  legacy?: boolean;
  shadowMap?: boolean | Partial<THREE.WebGLShadowMap>;
  size?: { width: number; height: number };
  onCreated?: (state: any) => void;
  onPointerMissed?: (event: MouseEvent) => void;
  onCreated?: (state: any) => void;
}

const XRCanvas: React.FC<XRCanvasProps> = ({
  children,
  className,
  style,
  camera = { position: [0, 1.6, 3] as [number, number, number], fov: 50 },
  dpr = [1, 2],
  gl,
  shadows = true,
  frameloop = 'always',
  resize,
  onCreated,
  onPointerMissed,
  events,
  raycaster,
  performance,
  linear = false,
  flat = false,
  orthographic = false,
  vr = false,
  ar = true,
  arSessionInit,
  webxr = true,
  webxrOptions,
  concurrent = true,
  pixelRatio,
  cameraManual = false,
  disableEvents = false,
  disableAutoClear = false,
  disableRender = false,
  disableErrorHandling = false,
  disableColorManagement = false,
  gl2 = false,
  legacy = false,
  shadowMap = true,
  size,
  ...rest
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [supported, setSupported] = useState(false);
  const [session, setSession] = useState<XRSession | null>(null);

  useEffect(() => {
    const checkSupport = async () => {
      if (navigator.xr) {
        const isSupported = await navigator.xr.isSessionSupported('immersive-ar');
        setSupported(isSupported);
      }
    };
    checkSupport();
  }, []);

  const handleSessionStart = useCallback(async () => {
    if (!navigator.xr) return;

    try {
      const session = await navigator.xr.requestSession('immersive-ar', {
        optionalFeatures: ['dom-overlay'],
        domOverlay: { root: document.body },
        ...arSessionInit,
      });
      
      setSession(session);
      
      session.addEventListener('end', () => {
        setSession(null);
      });
      
      return session;
    } catch (error) {
      console.error('Failed to start AR session:', error);
      return null;
    }
  }, [arSessionInit]);

  const handleSessionEnd = useCallback(() => {
    if (session) {
      session.end().catch(console.error);
    }
  }, [session]);

  const canvasProps = {
    className,
    style,
    camera,
    dpr,
    gl: {
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      ...gl,
    },
    shadows,
    frameloop,
    resize,
    onCreated,
    onPointerMissed,
    events,
    raycaster,
    performance,
    linear,
    flat,
    orthographic,
    vr,
    webxr,
    webxrOptions,
    concurrent,
    pixelRatio,
    cameraManual,
    disableEvents,
    disableAutoClear,
    disableRender,
    disableErrorHandling,
    disableColorManagement,
    gl2,
    legacy,
    shadowMap,
    size,
    ...rest,
  };

  return (
    <div className={`relative w-full h-full ${className || ''}`}>
      <Canvas ref={canvasRef} {...canvasProps}>
        <XR>
          <PerspectiveCamera makeDefault position={[0, 1.6, 3]} fov={50} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          {children}
          {!ar && <OrbitControls />}
        </XR>
      </Canvas>
      
      {ar && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <button
            onClick={session ? handleSessionEnd : handleSessionStart}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {session ? 'Exit AR' : 'View in AR'}
          </button>
        </div>
      )}
      
      {!supported && ar && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="text-white text-center p-4">
            <p>AR is not supported on your device or browser.</p>
            <p className="text-sm text-gray-300 mt-2">Try using Chrome on Android or Safari on iOS.</p>
          </div>
        </div>
      )}
    </div>
  );
};

interface ARViewerEnhancedProps {
  modelUrl: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  enableRotate?: boolean;
  onClose?: () => void;
  onError?: (error: Error) => void;
  onLoad?: () => void;
  className?: string;
}

const Model = ({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: { 
  url: string; 
  scale?: number; 
  position?: [number, number, number];
  rotation?: [number, number, number];
}) => {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!scene) {
      const err = new Error(`Failed to load model: ${url}`);
      setError(err);
      console.error(err);
      return;
    }

    // Set model properties
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return () => {
      // Cleanup GLTF resources if needed
      if (scene) {
        scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(material => material.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
      }
    };
  }, [scene, url]);

  useFrame(() => {
    if (modelRef.current) {
      // Add any continuous animations here
      // modelRef.current.rotation.y += 0.005;
    }
  });

  if (error) {
    return null;
  }

  return (
    <group 
      ref={modelRef} 
      scale={scale}
      position={position}
      rotation={rotation}
      dispose={null}
    >
      <primitive object={scene} />
    </group>
  );
};

const ARScene = ({
  modelUrl,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onClose,
  onError,
  onLoad,
}: ARViewerEnhancedProps) => {
  const { gl } = useThree();
  const { isARActive, endARSession } = useAR();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleResize = () => {
      gl.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [gl]);

  useEffect(() => {
    if (onLoad && !loading) {
      onLoad();
    }
  }, [loading, onLoad]);

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  const handleClose = () => {
    if (isARActive) {
      endARSession();
    }
    if (onClose) onClose();
  };

  return (
    <div className="relative w-full h-full">
      {isARActive ? (
        <XR>
          <ARCanvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            onCreated={({ gl }) => {
              gl.setPixelRatio(window.devicePixelRatio);
            }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <Suspense fallback={null}>
              <Model 
                url={modelUrl} 
                scale={scale}
                position={position}
                rotation={rotation}
              />
            </Suspense>
          </ARCanvas>
        </XR>
      ) : (
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 50 }}
          onCreated={({ gl }) => {
            gl.setPixelRatio(window.devicePixelRatio);
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            autoRotate={false}
          />
          <Suspense fallback={null}>
            <Model 
              url={modelUrl} 
              scale={scale}
              position={position}
              rotation={rotation}
            />
          </Suspense>
        </Canvas>
      )}
      
      {onClose && (
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
          aria-label="Close AR viewer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-lg">Loading 3D model...</div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900 bg-opacity-75">
          <div className="text-white text-center p-4">
            <div className="text-xl font-bold mb-2">Error Loading Model</div>
            <div className="mb-4">{error.message}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-white text-red-900 rounded-md"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function ARViewerEnhanced(props: ARViewerEnhancedProps) {
  const { isARSupported } = useAR();
  
  return (
    <div className={`relative w-full h-full ${props.className || ''}`}>
      {isARSupported ? (
        <ARScene {...props} />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="text-white text-center p-6 rounded-lg bg-gray-900 bg-opacity-90 max-w-md">
            <h3 className="text-xl font-bold mb-2">AR Not Supported</h3>
            <p className="mb-4">
              Your browser or device doesn't support AR features. 
              Please try using a different device or browser that supports WebXR.
            </p>
            <p className="text-sm text-gray-400">
              Recommended: Latest Chrome on Android or Safari on iOS 12+ with ARKit support.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
