'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface DataPoint {
  id: string;
  value: number;
  label: string;
  color: string;
  category?: string;
}

interface BarProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  label?: string;
  value?: number;
  onHover?: (hovered: boolean) => void;
  onClick?: () => void;
}

function Bar({
  position,
  size,
  color,
  label,
  value,
  onHover,
  onClick
}: BarProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  
  // Animation on hover
  useFrame(() => {
    if (meshRef.current) {
      const targetY = hovered ? size[1] * 1.1 : size[1];
      meshRef.current.scale.y = THREE.MathUtils.lerp(
        meshRef.current.scale.y,
        targetY,
        0.1
      );
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        position={[0, size[1] / 2, 0]}
        onPointerOver={() => {
          setHover(true);
          onHover?.(true);
        }}
        onPointerOut={() => {
          setHover(false);
          onHover?.(false);
        }}
        onClick={onClick}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[size[0], size[1], size[2]]} />
        <meshStandardMaterial 
          color={hovered ? new THREE.Color(color).lerp(new THREE.Color(1, 1, 1), 0.3) : color}
          metalness={0.5}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Bar label */}
      {label && (
        <Text
          position={[0, -0.2, 0]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
      
      {/* Value label */}
      {value !== undefined && hovered && (
        <Text
          position={[0, size[1] + 0.3, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="black"
          outlineOpacity={0.8}
        >
          {value.toLocaleString()}
        </Text>
      )}
    </group>
  );
}

interface DataVisualizationProps {
  data: DataPoint[];
  type?: 'bar' | 'pie' | 'line';
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  onSelect?: (id: string) => void;
}

function DataVisualizationScene({
  data,
  type = 'bar',
  onSelect,
}: Omit<DataVisualizationProps, 'className' | 'title' | 'style'>) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { camera } = useThree();
  
  // Calculate max value for scaling
  const maxValue = useMemo(() => {
    return Math.max(...data.map(d => d.value), 1);
  }, [data]);

  // Set up camera
  useEffect(() => {
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // Auto-rotate
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  // Handle bar chart
  const renderBars = () => {
    const barWidth = 0.6;
    const barDepth = 0.4;
    const spacing = 0.2;
    const totalWidth = (data.length * (barWidth + spacing)) - spacing;
    const startX = -totalWidth / 2 + barWidth / 2;
    
    return data.map((item, i) => {
      const height = (item.value / maxValue) * 3;
      const x = startX + i * (barWidth + spacing);
      
      return (
        <Bar
          key={item.id}
          position={[x, 0, 0]}
          size={[barWidth, height, barDepth]}
          color={item.color}
          label={item.label}
          value={item.value}
          onHover={(hovered) => hovered ? setHoveredId(item.id) : setHoveredId(null)}
          onClick={() => onSelect?.(item.id)}
        />
      );
    });
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />
      
      <group ref={groupRef}>
        <gridHelper args={[10, 10, '#0c4a6e', '#0c4a6e']} rotation={[-Math.PI / 2, 0, 0]} />
        {type === 'bar' && renderBars()}
      </group>
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
}

export default function DataVisualization({
  data,
  type = 'bar',
  title,
  className = '',
  style = {},
  onSelect,
}: DataVisualizationProps) {
  const [mounted, setMounted] = useState(false);
  
  // Ensure we're in the browser before rendering Three.js
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <div className={`bg-gray-900 rounded-xl p-4 ${className}`} style={style}>
        {title && <h3 className="text-white text-lg mb-4">{title}</h3>}
        <div className="h-64 bg-gray-800 rounded flex items-center justify-center">
          <p className="text-gray-500">Loading visualization...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full rounded-xl overflow-hidden ${className}`} style={style}>
      {title && (
        <div className="absolute top-4 left-4 z-10 text-white text-lg font-medium">
          {title}
        </div>
      )}
      <Canvas shadows>
        <DataVisualizationScene data={data} type={type} onSelect={onSelect} />
      </Canvas>
    </div>
  );
}

// Sample data for demonstration
DataVisualization.sampleData = [
  { id: '1', value: 120, label: 'Q1', color: '#3b82f6', category: '2023' },
  { id: '2', value: 180, label: 'Q2', color: '#3b82f6', category: '2023' },
  { id: '3', value: 150, label: 'Q3', color: '#3b82f6', category: '2023' },
  { id: '4', value: 210, label: 'Q4', color: '#3b82f6', category: '2023' },
  { id: '5', value: 170, label: 'Q1', color: '#10b981', category: '2024' },
  { id: '6', value: 230, label: 'Q2', color: '#10b981', category: '2024' },
];
