'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function GridScene() {
  const { camera } = useThree();
  const gridRef = useRef<THREE.GridHelper>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Initialize camera position
  useEffect(() => {
    camera.position.set(0, 10, 15);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // Animation loop
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <gridHelper 
        ref={gridRef} 
        args={[50, 50, '#0ea5e9', '#0c4a6e']} 
        position={[0, -1, 0]} 
        rotation={[Math.PI / 2, 0, 0]}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </group>
  );
}

interface ARGridProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function ARGrid({ className = '', style = {} }: ARGridProps) {
  return (
    <div 
      className={`fixed inset-0 -z-10 opacity-20 ${className}`}
      style={style}
    >
      <Canvas>
        <GridScene />
      </Canvas>
    </div>
  );
}
