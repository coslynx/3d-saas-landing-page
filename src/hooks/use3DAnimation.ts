import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

interface AnimationControls {
  play: () => void;
  pause: () => void;
  reverse: () => void;
  seek: (position: number) => void;
}

interface Use3DAnimationResult {
  createTimeline: (config?: gsap.core.TimelineVars) => gsap.core.Timeline;
  animationControls: AnimationControls;
}

/**
 * Custom hook for managing 3D animations using GSAP and integrating with Three.js objects.
 *
 * @returns {Use3DAnimationResult} An object containing functions to create and control animations.
 */
const use3DAnimation = (): Use3DAnimationResult => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const { scene } = useThree();

  const createTimeline = useCallback((config?: gsap.core.TimelineVars): gsap.core.Timeline => {
    const timeline = gsap.timeline(config);
    timelineRef.current = timeline;
    return timeline;
  }, []);

  const animationControls = useMemo<AnimationControls>(() => ({
    play: () => {
      if (timelineRef.current) {
        timelineRef.current.play();
      }
    },
    pause: () => {
      if (timelineRef.current) {
        timelineRef.current.pause();
      }
    },
    reverse: () => {
      if (timelineRef.current) {
        timelineRef.current.reverse();
      }
    },
    seek: (position: number) => {
      if (timelineRef.current) {
        timelineRef.current.seek(position);
      }
    },
  }), []);

  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, []);

  return { createTimeline, animationControls };
};

export default use3DAnimation;