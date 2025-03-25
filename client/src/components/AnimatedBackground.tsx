import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AnimatedBackgroundProps {
  color?: string;
  density?: number;
  speed?: number;
}

const AnimatedBackground = ({
  color = '#3498DB',
  density = 50,
  speed = 0.05
}: AnimatedBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });

    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // Create particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = density;
    
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      scales[i] = Math.random();
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    
    // Create material
    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.1,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    
    // Create points
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Add lines connecting close particles
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.3,
    });
    
    const linePositions: number[] = [];
    const lineGeometry = new THREE.BufferGeometry();
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Position camera
    camera.position.z = 5;

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate particles
      particles.rotation.x += speed * 0.1;
      particles.rotation.y += speed * 0.15;
      
      // Update particles
      const positions = particleGeometry.attributes.position.array as Float32Array;
      const count = positions.length / 3;
      
      // Connect close particles with lines
      linePositions.length = 0;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x1 = positions[i3];
        const y1 = positions[i3 + 1];
        const z1 = positions[i3 + 2];
        
        for (let j = i + 1; j < count; j++) {
          const j3 = j * 3;
          const x2 = positions[j3];
          const y2 = positions[j3 + 1];
          const z2 = positions[j3 + 2];
          
          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (distance < 1.5) {
            linePositions.push(x1, y1, z1);
            linePositions.push(x2, y2, z2);
          }
        }
      }
      
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      scene.remove(particles);
      scene.remove(lines);
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineMaterial.dispose();
      lineGeometry.dispose();
      renderer.dispose();
    };
  }, [color, density, speed]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default AnimatedBackground;