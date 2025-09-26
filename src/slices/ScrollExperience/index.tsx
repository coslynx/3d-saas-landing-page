import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import * as THREE from 'three';
import { ScrollExperienceProps } from './types';

const ScrollExperience: React.FC<ScrollExperienceProps> = ({
  modelPath = '/models/scene.glb',
  animationConfig,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scrollY } = useScrollAnimation(groupRef);
  const { nodes, materials } = useGLTF(modelPath) as any;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollY / 5;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <scene name="Scene">
        <mesh
          name="Suzanne"
          geometry={nodes.Suzanne.geometry}
          material={materials.defaultMaterial}
          position={[0, 0, 0]}
          scale={0.75}
        />
      </scene>
    </group>
  );
};

export default ScrollExperience;