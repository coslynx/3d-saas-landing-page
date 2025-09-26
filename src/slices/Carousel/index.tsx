import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useTheme } from '../../components/context/ThemeContext';
import { use3DAnimation } from '../../hooks/use3DAnimation';
import { three3DHelpersUtil } from '../../utils/three-helpers';
import { Button } from '../../components/ui/Button';
import type { ThreeDComponentProps } from '../../types';

interface CarouselItemProps {
  modelPath: string;
  position: [number, number, number];
  rotation: [number, number, number];
  content: React.ReactNode;
  id: string;
}

interface CarouselProps {
  items: CarouselItemProps[];
  autoRotate?: boolean;
  transitionDuration?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoRotate = false,
  transitionDuration = 1000,
}) => {
  const { scene, camera, gl, size } = useThree();
  const { isDarkMode } = useTheme();
  const { createTimeline, animationControls } = use3DAnimation();
  const [current, setCurrent] = useState(0);
  const groupRef = useRef<THREE.Group>(null);
  const isMobile = useMemo(() => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent), []);
  const modelCache = useRef<{[key:string]: THREE.Group}>({});

  useEffect(() => {
    items.forEach(item => {
      if (!modelCache.current[item.id]) {
        const loader = new THREE.GLTFLoader();
        loader.load(item.modelPath, (gltf) => {
          modelCache.current[item.id] = gltf.scene;
        }, undefined, (error) => {
          console.error(`Failed to load model for item ${item.id}:`, error);
        });
      }
    });
  }, [items]);

  useEffect(() => {
    if (items.length === 0 || !gl.domElement) return;

    camera.position.set(0, 1, 5);

    return () => {
      // Clean up any resources here.
    };
  }, [items, gl, camera]);

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= items.length) return;

    animationControls.pause();
    const timeline = createTimeline();

    timeline.to(groupRef.current!.position, {
      x: -index * 5,
      duration: transitionDuration / 1000,
      ease: "power3.inOut",
      onComplete: () => {
        setCurrent(index);
        animationControls.play();
      },
    });
    animationControls.play();
  }, [items, createTimeline, animationControls, transitionDuration]);

  const next = useCallback(() => {
    goTo((current + 1) % items.length);
  }, [current, items.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + items.length) % items.length);
  }, [current, items.length, goTo]);

  useFrame(() => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <mesh position={item.position}>
            {modelCache.current[item.id] && <primitive object={modelCache.current[item.id].clone()} />}
          </mesh>
          <Html 
            position={[item.position[0], item.position[1] -1 , item.position[2]]}
            occlude
            transform
            wrapperClass="html-content"
          >
            <div className="bg-white p-4 rounded-md shadow-lg">
              {item.content}
            </div>
          </Html>
        </React.Fragment>
      ))}
      {!isMobile && <OrbitControls />}
      <group position={[0, -3, 0]}>
        <Button onClick={prev} className="mr-2">Prev</Button>
        <Button onClick={next} className="ml-2">Next</Button>
      </group>
    </group>
  );
};

export default Carousel;