'use client';

import { motion, useAnimation, Variants } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface ARTextProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  color?: string;
  hoverEffect?: boolean;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
}

const ARText = ({
  children,
  className = '',
  depth = 3,
  color = 'var(--primary)',
  hoverEffect = true,
  delay = 0,
  as: Tag = 'span',
  ...props
}: ARTextProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  const variants: Variants = {
    hidden: { 
      opacity: 0,
      y: 20,
      textShadow: `${depth}px ${depth}px 0 rgba(0,0,0,0)`
    },
    visible: {
      opacity: 1,
      y: 0,
      textShadow: Array.from({ length: depth })
        .map((_, i) => `${i + 1}px ${i + 1}px 0 hsla(${color}, ${0.8 - (i * 0.2)})`)
        .join(','),
      transition: {
        delay: delay * 0.1,
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    hover: hoverEffect ? {
      textShadow: Array.from({ length: depth })
        .map((_, i) => `${(i + 1) * 1.5}px ${(i + 1) * 1.5}px 0 hsla(${color}, ${0.8 - (i * 0.2)})`)
        .join(','),
      transition: { duration: 0.2 },
    } : {},
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      initial="hidden"
      animate={controls}
      variants={variants}
      whileHover={hoverEffect ? 'hover' : undefined}
      {...props}
    >
      {children}
    </motion.span>
  );
};

export default ARText;
