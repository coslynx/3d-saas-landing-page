import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { Power3 } from 'gsap';
import { motion } from 'framer-motion';

import { useTheme } from '../../components/context/ThemeContext';
import { use3DAnimation } from '../../hooks/use3DAnimation';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { three3DHelpersUtil } from '../../utils/three-helpers';
import { Button } from '../../components/ui/Button';
import { TextSplitter } from '../../components/ui/TextSplitter';
import type { ThreeDComponentProps } from '../../types';

interface HeroProps {
  modelPath?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

const Hero: React.FC<HeroProps> = ({
  modelPath = '/models/default.glb',
  title = 'Welcome to Our SaaS Product',
  description = 'Experience innovation with our cutting-edge 3D landing page. Explore interactive models and smooth animations.',
  ctaText = 'Get Started',
  ctaLink = '#features',
}) => {
  const { scene, camera, gl, size } = useThree();
  const { isDarkMode, colors } = useTheme();
  const { createTimeline, animationControls } = use3DAnimation();
  const heroRef = useRef<HTMLElement>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { scrollY, scrollProgress } = useScrollAnimation(heroRef);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { nodes, materials } = useGLTF(modelPath) as any;

  useEffect(() => {
    camera.position.set(0, 1, 5);
    camera.lookAt(0, 0, 0);

    return () => {
      // Clean up
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.1;
  });

  return (
    <motion.section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: isDarkMode ? colors.darkSurface : colors.lightSurface }}
    >
      <div className="absolute inset-0">
        {/* 3D Canvas */}
        <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <group ref={groupRef}>
            {nodes &&
              Object.keys(nodes).map((key) => {
                const node = nodes[key];
                if (node instanceof THREE.Mesh) {
                  return (
                    <mesh
                      key={key}
                      geometry={node.geometry}
                      material={materials[node.material.name]}
                      position={node.position}
                      rotation={node.rotation}
                      scale={node.scale}
                    />
                  );
                }
                return null;
              })}
          </group>
        </Canvas>
      </div>

      {/* Text Content */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.5, ease: Power3.easeOut }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            <TextSplitter text={title} splitBy="word" className="inline-block" />
          </h1>
          <p className="text-lg text-gray-200 mb-8">{description}</p>
          <Button variant="primary" size="large" onClick={() => {}}>
            {ctaText}
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;

import { Canvas, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { useAnimations } from '@react-three/drei';