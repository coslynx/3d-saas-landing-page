import { create } from 'zustand';
import * as THREE from 'three';

interface MainStore {
  // 3D Model States
  modelLoading: boolean;
  loadedModel: THREE.Object3D | null;
  modelError: Error | null;
  loadModel: (modelPath: string) => Promise<void>;
  
  // Scene States
  currentScene: string;
  backgroundColor: THREE.Color;
  setScene: (sceneName: string) => void;

  // Animation States
  animationSpeed: number;
  animationEnabled: boolean;
  enableAnimation: (enabled: boolean) => void;

  // Interaction States
  hoveredObject: THREE.Object3D | null;
  selectedObject: THREE.Object3D | null;
  onHover: (object: THREE.Object3D | null) => void;
  onSelect: (object: THREE.Object3D | null) => void;

  // Performance States
  currentFPS: number;
  averageFPS: number;
  peakMemoryUsage: number;
  updateFPS: (fps: number) => void;
  updateMemoryUsage: (memoryUsage: number) => void;

  // Effects States
  outlineEnabled: boolean;
  brightness: number;
  glowIntensity: number;
  setOutlineEnabled: (enabled: boolean) => void;
  setBrightness: (brightness: number) => void;
  setGlowIntensity: (glowIntensity: number) => void;

  // Breakpoints States
  currentBreakpoint: string;
  setCurrentBreakpoint: (breakpoint: string) => void;

  // Reset Functions
  resetModelStates: () => void;
  resetSceneStates: () => void;
  resetAnimationStates: () => void;
  resetInteractionStates: () => void;
  resetPerformanceStates: () => void;
  resetEffectsStates: () => void;
  resetBreakpointStates: () => void;
}

const useStore = create<MainStore>((set, get) => ({
  // 3D Model States
  modelLoading: false,
  loadedModel: null,
  modelError: null,
  loadModel: async (modelPath: string) => {
    set({ modelLoading: true, modelError: null });
    try {
      // Replace this with your actual model loading logic using Three.js
      // For example, using GLTFLoader:
      const loader = new THREE.GLTFLoader();
      loader.load(
        modelPath,
        (gltf) => {
          set({ loadedModel: gltf.scene, modelLoading: false });
        },
        (xhr) => {
          //console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        (error) => {
          console.error('An error happened', error);
          set({ modelError: error, modelLoading: false });
        }
      );

    } catch (error:any) {
      set({ modelError: error, modelLoading: false });
    }
  },

  // Scene States
  currentScene: 'home',
  backgroundColor: new THREE.Color('#ffffff'),
  setScene: (sceneName: string) => {
    let color = '#ffffff';
    switch (sceneName) {
      case 'home':
        color = '#ffffff';
        break;
      case 'modelShowcase':
        color = '#f0f0f0';
        break;
      case 'experience':
        color = '#e0e0e0';
        break;
      default:
        color = '#ffffff';
    }
    set({ currentScene: sceneName, backgroundColor: new THREE.Color(color) });
    // You can add more logic here to load models, animations, etc. specific to each scene
  },

  // Animation States
  animationSpeed: 1,
  animationEnabled: true,
  enableAnimation: (enabled: boolean) => set({ animationEnabled: enabled }),

  // Interaction States
  hoveredObject: null,
  selectedObject: null,
  onHover: (object: THREE.Object3D | null) => set({ hoveredObject: object }),
  onSelect: (object: THREE.Object3D | null) => set({ selectedObject: object }),

  // Performance States
  currentFPS: 0,
  averageFPS: 0,
  peakMemoryUsage: 0,
  updateFPS: (fps: number) => set({ currentFPS: fps }),
  updateMemoryUsage: (memoryUsage: number) => set({ peakMemoryUsage: memoryUsage }),

  // Effects States
  outlineEnabled: false,
  brightness: 0.75,
  glowIntensity: 0.25,
  setOutlineEnabled: (enabled: boolean) => set({ outlineEnabled: enabled }),
  setBrightness: (brightness: number) => set({ brightness: brightness }),
  setGlowIntensity: (glowIntensity: number) => set({ glowIntensity: glowIntensity }),

  // Breakpoints States
  currentBreakpoint: 'md',
  setCurrentBreakpoint: (breakpoint: string) => set({ currentBreakpoint: breakpoint }),

  // Reset Functions
  resetModelStates: () => set({ modelLoading: false, loadedModel: null, modelError: null }),
  resetSceneStates: () => set({ currentScene: 'home', backgroundColor: new THREE.Color('#ffffff') }),
  resetAnimationStates: () => set({ animationSpeed: 1, animationEnabled: true }),
  resetInteractionStates: () => set({ hoveredObject: null, selectedObject: null }),
  resetPerformanceStates: () => set({ currentFPS: 0, averageFPS: 0, peakMemoryUsage: 0 }),
  resetEffectsStates: () => set({ outlineEnabled: false, brightness: 0.75, glowIntensity: 0.25 }),
  resetBreakpointStates: () => set({ currentBreakpoint: 'md' }),
}));

export default useStore;