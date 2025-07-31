import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import * as THREE from 'three';

// Provokante Claims als Array-Props (einfach steuerbar)
const REBELLION_CLAIMS = [
  { text: "Nie matschig.", position: "top-left" },
  { text: "100% Stabil.", position: "top-right" },
  { text: "Swiss Quality.", position: "bottom-left" },
  { text: "Uncool für Ökos.", position: "bottom-right" }
];

// 3D Straw Model Component
function StrawModel({ scrollProgress }: { scrollProgress: any }) {
  const meshRef = useRef<THREE.Group>(null);
  
  // TODO: Add your 3D GLB model here
  // Example: const gltf = useLoader(GLTFLoader, '/models/straw.glb');
  
  // Animate rotation based on scroll
  useFrame(() => {
    if (meshRef.current) {
      // Y-axis rotation based on scroll progress
      meshRef.current.rotation.y = scrollProgress.get() * Math.PI * 2;
      
      // Subtle floating animation
      meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  // Fallback: SVG-based 3D representation (until GLB model is added)
  return (
    <group ref={meshRef} scale={[2, 2, 2]}>
      {/* TODO: Replace this with your GLB model loader:
          <primitive object={gltf.scene} />
          
          For now using a 3D cylinder as placeholder */}
      
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 3, 16]} />
        <meshStandardMaterial 
          color="#00BFA6" 
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>
      
      {/* Bent top section */}
      <mesh position={[0.3, 1.2, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
        <meshStandardMaterial 
          color="#00BFA6" 
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>
      
      {/* Swiss quality indicator ring */}
      <mesh position={[0, -0.5, 0]}>
        <torusGeometry args={[0.15, 0.02, 8, 16]} />
        <meshStandardMaterial 
          color="#FFD54F" 
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-primary"></div>
    </div>
  );
}

interface Hero3DProps {
  claims?: Array<{ text: string; position: string; }>;
  className?: string;
  modelPath?: string; // Path to GLB model
}

export default function Hero3D({ 
  claims = REBELLION_CLAIMS, 
  className = "",
  modelPath = "/models/straw.glb" // TODO: Add your GLB model path here
}: Hero3DProps) {
  const [isScrollTriggered, setIsScrollTriggered] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Scroll progress for animations
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Transform values based on scroll
  const canvasY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -100, -200]);
  const canvasScale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.9, 0.8]);

  // Check if canvas is in view for claims animation
  const canvasInView = useInView(canvasRef, { 
    once: false, 
    margin: "-20% 0px -20% 0px" 
  });

  // Trigger claims when scrolling starts
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.1 && !isScrollTriggered) {
        setIsScrollTriggered(true);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, isScrollTriggered]);

  // Position mapping for claims around the 3D model
  const getClaimPosition = (position: string) => {
    const positions = {
      "top-left": "top-4 left-4 lg:top-8 lg:left-8",
      "top-right": "top-4 right-4 lg:top-8 lg:right-8", 
      "bottom-left": "bottom-4 left-4 lg:bottom-8 lg:left-8",
      "bottom-right": "bottom-4 right-4 lg:bottom-8 lg:right-8"
    };
    return positions[position as keyof typeof positions] || "top-4 left-4";
  };

  const handleOrderClick = () => {
    // Scroll to products section or navigate to shop
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      ref={heroRef}
      className={cn(
        "relative min-h-screen bg-gradient-to-br from-white to-[#F6FFFC] overflow-hidden",
        className
      )}
    >
      {/* Main Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        
        {/* Large Headline */}
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black text-brand-secondary text-center leading-tight mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Endlich wieder<br />
          <span className="text-brand-primary">echte</span><br />
          Strohhalme.
        </motion.h1>

        {/* 3D Canvas Container - Central Hero Object */}
        <motion.div
          ref={canvasRef}
          className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[32rem] lg:h-[32rem] mb-8 lg:mb-12"
          style={{ 
            y: canvasY,
            scale: canvasScale
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          {/* React Three Fiber Canvas for 3D Model */}
          <Canvas
            className="w-full h-full"
            dpr={[1, 2]}
            camera={{ position: [0, 0, 5], fov: 50 }}
          >
            <Suspense fallback={null}>
              {/* Lighting Setup */}
              <ambientLight intensity={0.4} />
              <directionalLight 
                position={[5, 5, 5]} 
                intensity={1} 
                color="#ffffff"
                castShadow
              />
              <pointLight 
                position={[-5, 2, 2]} 
                intensity={0.5} 
                color="#00BFA6"
              />
              
              {/* Environment for reflections */}
              <Environment preset="studio" />
              
              {/* 3D Straw Model */}
              <StrawModel scrollProgress={scrollYProgress} />
              
              {/* Camera controls (disabled user interaction) */}
              <OrbitControls 
                enablePan={false}
                enableZoom={false}
                enableRotate={false}
                autoRotate={false}
              />
            </Suspense>
          </Canvas>

          {/* Animated Claims/Badges around the 3D model */}
          {isScrollTriggered && canvasInView && claims.map((claim, index) => (
            <motion.div
              key={index}
              className={cn(
                "absolute z-20",
                getClaimPosition(claim.position)
              )}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2 + 0.5,
                ease: "easeOut",
                type: "spring",
                stiffness: 200
              }}
            >
              <Badge 
                variant="outline" 
                className="bg-white/90 backdrop-blur-sm border-brand-primary text-brand-secondary font-semibold text-sm px-3 py-1.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {claim.text}
              </Badge>
              
              {/* Connecting line to 3D model (optional) */}
              <motion.div
                className="absolute w-px h-8 bg-brand-primary/30 left-1/2 -translate-x-1/2"
                style={{
                  [claim.position.includes('top') ? 'top' : 'bottom']: '100%',
                  transform: claim.position.includes('top') ? 'translateX(-50%) rotate(45deg)' : 'translateX(-50%) rotate(-45deg)'
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.4, delay: index * 0.2 + 0.8 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Button
            onClick={handleOrderClick}
            size="lg"
            className="bg-brand-primary hover:bg-brand-primary/90 text-black font-bold text-xl px-12 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0"
          >
            Jetzt bestellen
          </Button>
        </motion.div>

        {/* Subtle scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-brand-primary/30 rounded-full flex justify-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 bg-brand-primary rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle mint background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-brand-primary rounded-full"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-brand-primary rounded-full"></div>
          <div className="absolute bottom-1/4 left-3/4 w-3 h-3 bg-brand-primary rounded-full"></div>
        </div>
      </div>

      {/* Development Notes */}
      <div className="absolute top-4 right-4 bg-yellow-100 border border-yellow-400 rounded-lg p-3 text-xs text-yellow-800 max-w-sm opacity-80 z-50">
        <strong>3D Model Setup:</strong><br />
        • Add your GLB straw model to <code>/public/models/straw.glb</code><br />
        • Model should be in mint color #00BFA6<br />
        • Uncomment GLTFLoader code above<br />
        • Remove this notice when model is added
      </div>
    </div>
  );
}

/* 
TODO: 3D Model Integration Steps
================================

1. Create GLB Model:
   - Design a realistic plastic straw in Blender/3D software
   - Apply mint color (#00BFA6) material
   - Export as GLB format
   - Size: roughly 3 units long, bent top section

2. Add Model to Project:
   - Place GLB file in /public/models/straw.glb
   - Uncomment the GLTFLoader line above
   - Replace the placeholder cylinders with: <primitive object={gltf.scene} />

3. Optimize:
   - Ensure model is < 1MB for web performance
   - Apply proper materials with metalness/roughness
   - Test on mobile devices

4. Advanced Features:
   - Add texture maps for ridged surface
   - Implement physics-based materials
   - Add particle effects for premium feel
*/