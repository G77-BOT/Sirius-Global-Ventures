import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Floating3DLogoProps {
  text?: string;
  colorPrimary?: string;
  colorSecondary?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Floating3DLogo = ({
  text = 'SGV',
  colorPrimary = '#3498DB',
  colorSecondary = '#2C3E50',
  size = 'md',
  className = ''
}: Floating3DLogoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  
  // Calculate dimensions based on size
  const dimensions = {
    sm: { width: 60, height: 60, fontSize: 28 },
    md: { width: 80, height: 80, fontSize: 36 },
    lg: { width: 120, height: 120, fontSize: 54 },
  }[size];
  
  useEffect(() => {
    if (!logoRef.current || !shadowRef.current) return;
    
    // Create floating animation 
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    // Animate logo floating
    tl.to(logoRef.current, {
      y: '-=15',
      duration: 2,
      ease: 'power1.inOut',
    });
    
    // Animate shadow
    gsap.to(shadowRef.current, {
      scale: 0.85,
      opacity: 0.5,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut',
    });
    
    // Create tilt effect on mouse move
    if (containerRef.current) {
      const container = containerRef.current;
      
      const handleMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = container.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        gsap.to(logoRef.current, {
          rotationY: x * 20,
          rotationX: y * -20,
          transformPerspective: 500,
          ease: 'power2.out',
          duration: 0.5,
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(logoRef.current, {
          rotationY: 0,
          rotationX: 0,
          ease: 'power2.out',
          duration: 1,
        });
      };
      
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ 
        width: dimensions.width, 
        height: dimensions.height + 30,
        perspective: 1000 
      }}
    >
      {/* 3D Logo */}
      <div
        ref={logoRef}
        className="absolute top-0 flex items-center justify-center rounded-xl font-bold text-white transform-gpu"
        style={{ 
          width: dimensions.width, 
          height: dimensions.height,
          fontSize: dimensions.fontSize,
          background: `linear-gradient(135deg, ${colorPrimary}, ${colorSecondary})`,
          boxShadow: `0 15px 35px rgba(0, 0, 0, 0.1), 
                      0 3px 10px rgba(0, 0, 0, 0.05),
                      inset 0 2px 1px rgba(255, 255, 255, 0.1)`,
        }}
      >
        {text}
      </div>
      
      {/* Shadow */}
      <div
        ref={shadowRef}
        className="absolute bottom-0 left-0 right-0 mx-auto rounded-full bg-black opacity-20"
        style={{ 
          width: dimensions.width * 0.8, 
          height: dimensions.width * 0.1,
          filter: 'blur(7px)',
          zIndex: -1,
          transform: 'translateY(15px)'
        }}
      />
    </div>
  );
};

export default Floating3DLogo;