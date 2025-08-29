'use client';

import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

interface LocationMarkerProps {
  lat: number;
  lng: number;
  size?: number;
  color?: string;
  label?: string;
  onClick?: () => void;
}

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
}

function LocationMarker({ 
  lat, 
  lng, 
  size = 0.05, 
  color = '#ff0000',
  label,
  onClick 
}: LocationMarkerProps) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  
  // Position on the globe surface
  const position = useMemo(() => {
    return latLngToVector3(lat, lng, 1 + size * 1.5);
  }, [lat, lng, size]);

  // Animate the marker
  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(hovered ? size * 1.5 : size);
      
      // Subtle pulsing animation
      const pulse = Math.sin(state.clock.getElapsedTime() * 3) * 0.1 + 1;
      ref.current.scale.multiplyScalar(pulse);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={ref}
        onClick={onClick}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial 
          color={hovered ? '#ff5555' : color} 
          emissive={color} 
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {label && hovered && (
        <Html center>
          <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

interface GlobeProps {
  locations?: Array<{
    lat: number;
    lng: number;
    color?: string;
    label?: string;
    onClick?: () => void;
  }>;
  className?: string;
  style?: React.CSSProperties;
  autoRotate?: boolean;
  onLocationClick?: (location: any) => void;
}

function GlobeScene({ 
  locations = [], 
  autoRotate = true,
  onLocationClick 
}: Omit<GlobeProps, 'className' | 'style'>) {
  const globeRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  
  // Initialize camera position
  useEffect(() => {
    camera.position.z = 3;
  }, [camera]);

  // Auto-rotate the globe
  useFrame(({ clock }) => {
    if (globeRef.current && autoRotate) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      {/* Stars background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#1e3a8a"
          metalness={0.2}
          roughness={0.8}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
        
        {/* Globe texture */}
        <meshStandardMaterial
          map={new THREE.TextureLoader().load('/images/earth-texture.jpg')}
          metalness={0.1}
          roughness={0.7}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Cloud layer */}
      <mesh>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshStandardMaterial
          map={new THREE.TextureLoader().load('/images/clouds.png')}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      
      {/* Atmosphere */}
      <mesh>
        <sphereGeometry args={[1.1, 64, 64]} />
        <shaderMaterial
          attach="material"
          args={[{
            uniforms: {
              c: { value: 0.7 },
              p: { value: 4.0 },
              glowColor: { value: new THREE.Color(0x0c4a6e) },
              viewVector: { value: new THREE.Vector3(0, 0, 0) }
            },
            vertexShader: `
              uniform vec3 viewVector;
              uniform float c;
              uniform float p;
              varying float intensity;
              void main() {
                vec3 vNormal = normalize(normalMatrix * normal);
                vec3 vNormel = normalize(normalMatrix * viewVector);
                intensity = pow(c - dot(vNormal, vNormel), p);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              uniform vec3 glowColor;
              varying float intensity;
              void main() {
                vec3 glow = glowColor * intensity;
                gl_FragColor = vec4(glow, 1.0);
              }
            `,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true
          }]}
        />
      </mesh>
      
      {/* Location markers */}
      {locations.map((loc, i) => (
        <LocationMarker
          key={i}
          lat={loc.lat}
          lng={loc.lng}
          color={loc.color || '#ff0000'}
          label={loc.label}
          onClick={() => onLocationClick?.(loc)}
        />
      ))}
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        zoomSpeed={0.5}
        minDistance={1.5}
        maxDistance={5}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function Globe({
  locations = [],
  className = '',
  style = {},
  ...props
}: GlobeProps) {
  const [mounted, setMounted] = useState(false);
  
  // Ensure we're in the browser before rendering Three.js
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div className={`bg-gray-900 rounded-xl ${className}`} style={style} />;
  }

  return (
    <div className={`relative w-full h-full rounded-xl overflow-hidden ${className}`} style={style}>
      <Canvas>
        <GlobeScene locations={locations} {...props} />
      </Canvas>
    </div>
  );
}

// Sample data for demonstration
Globe.defaultLocations = [
  { lat: 40.7128, lng: -74.0060, label: 'New York', color: '#3b82f6' },
  { lat: 51.5074, lng: -0.1278, label: 'London', color: '#ef4444' },
  { lat: 35.6762, lng: 139.6503, label: 'Tokyo', color: '#10b981' },
  { lat: -33.8688, lng: 151.2093, label: 'Sydney', color: '#f59e0b' },
];
