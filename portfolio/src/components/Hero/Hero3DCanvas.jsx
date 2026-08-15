import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

const Model = ({ scrollProgress }) => {
  const { scene, animations } = useGLTF('/models/bumblebee.glb');
  const mixerRef = useRef(null);
  const actionRef = useRef(null);
  const groupRef = useRef(null);
  const currentTimeRef = useRef(0);

  // Preserve model original metallic materials and enhance lighting reflection
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Enhance material properties without turning them pitch black
        child.material.envMapIntensity = 1.8;
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  // Setup AnimationMixer for frame-accurate scroll scrubbing
  useEffect(() => {
    if (animations && animations.length > 0) {
      const mixer = new THREE.AnimationMixer(scene);
      mixerRef.current = mixer;

      const clip = animations[0];
      const action = mixer.clipAction(clip);
      action.play();
      action.paused = true;
      actionRef.current = action;

      return () => mixer.stopAllAction();
    }
  }, [animations, scene]);

  // Scrub animation smoothly frame by frame on scroll
  useFrame((_, delta) => {
    if (mixerRef.current && animations && animations[0]) {
      const clipDuration = animations[0].duration;
      // Target time based on scroll percentage (0 to 1)
      const targetTime = scrollProgress * clipDuration;

      // Smooth lerp interpolation for silky motion
      currentTimeRef.current = THREE.MathUtils.lerp(currentTimeRef.current, targetTime, 0.08);

      mixerRef.current.setTime(currentTimeRef.current);
    }
  });

  return (
    <group ref={groupRef} position={[0, -2.0, 0]} scale={0.038}>
      <primitive object={scene} />
    </group>
  );
};

// Preload GLB
useGLTF.preload('/models/bumblebee.glb');

const LoaderFallback = () => (
  <Html center>
    <div className="flex flex-col items-center justify-center space-y-3 bg-[#0b0f19]/90 backdrop-blur-md p-6 rounded-2xl border border-cyan-500/40 shadow-2xl">
      <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-cyan-300 text-xs font-mono tracking-widest uppercase font-bold">Loading 3D Transformer...</p>
    </div>
  </Html>
);

export const Hero3DCanvas = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress over the top 1.5 viewports so transformation unfolds smoothly
      const scrollY = window.scrollY;
      const targetHeight = window.innerHeight * 1.5;
      const progress = Math.min(1, Math.max(0, scrollY / targetHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Background Light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
      
      <Canvas
        camera={{ position: [0, 0.5, 8.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        {/* Studio Lighting Setup */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 15, 10]} intensity={3.0} color="#ffffff" castShadow />
        <directionalLight position={[-10, 10, -10]} intensity={2.0} color="#38bdf8" />
        <directionalLight position={[0, -10, 10]} intensity={1.0} color="#f59e0b" />
        <pointLight position={[0, 4, 5]} intensity={2.5} color="#06b6d4" />
        
        {/* HDRI Studio Environment Reflection */}
        <Environment preset="city" />

        <Suspense fallback={<LoaderFallback />}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <Model scrollProgress={scrollProgress} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
};
