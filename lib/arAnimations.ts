import { AnimationClip, AnimationMixer, LoopRepeat, Vector3 } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

/**
 * Animation manager for 3D models
 */
export class AnimationManager {
  private mixer: AnimationMixer;
  private animations: AnimationClip[] = [];
  private actions: { [key: string]: any } = {};
  private currentAction: string | null = null;
  
  constructor(model: THREE.Object3D, animations: AnimationClip[] = []) {
    this.mixer = new AnimationMixer(model);
    this.animations = animations;
  }
  
  /**
   * Load animations from a GLTF
   */
  static fromGLTF(gltf: GLTF): AnimationManager {
    const manager = new AnimationManager(gltf.scene, gltf.animations);
    return manager;
  }
  
  /**
   * Get all available animation names
   */
  getAnimationNames(): string[] {
    return this.animations.map(clip => clip.name);
  }
  
  /**
   * Play an animation by name
   */
  play(name: string, options: {
    loop?: boolean;
    clampWhenFinished?: boolean;
    timeScale?: number;
    weight?: number;
    fadeIn?: number;
    fadeOut?: number;
  } = {}): void {
    const {
      loop = true,
      clampWhenFinished = false,
      timeScale = 1,
      weight = 1,
      fadeIn = 0.5,
      fadeOut = 0.5,
    } = options;
    
    // Stop current animation if any
    if (this.currentAction) {
      const currentAction = this.actions[this.currentAction];
      if (currentAction) {
        currentAction.fadeOut(fadeOut);
      }
    }
    
    // Find the animation clip
    const clip = this.animations.find(anim => anim.name === name);
    if (!clip) {
      console.warn(`Animation "${name}" not found`);
      return;
    }
    
    // Get or create action
    let action = this.actions[name];
    if (!action) {
      action = this.mixer.clipAction(clip);
      this.actions[name] = action;
    }
    
    // Configure action
    action.reset();
    action.setLoop(loop ? LoopRepeat : 2201, loop ? Infinity : 1);
    action.clampWhenFinished = clampWhenFinished;
    action.timeScale = timeScale;
    action.setEffectiveWeight(weight);
    
    // Fade in
    if (fadeIn > 0) {
      action.fadeIn(fadeIn);
    }
    
    // Play
    action.play();
    this.currentAction = name;
  }
  
  /**
   * Update the animation mixer
   */
  update(deltaTime: number): void {
    this.mixer.update(deltaTime);
  }
  
  /**
   * Crossfade to another animation
   */
  crossFadeTo(
    name: string,
    duration: number = 0.5,
    warp: boolean = false
  ): void {
    if (!this.currentAction || this.currentAction === name) return;
    
    const currentAction = this.actions[this.currentAction];
    const nextAction = this.actions[name];
    
    if (!currentAction || !nextAction) return;
    
    // Enable the next action
    nextAction.reset();
    nextAction.play();
    
    // Crossfade
    nextAction.crossFadeFrom(currentAction, duration, true);
    
    // Warp for smooth transitions
    if (warp) {
      nextAction.time = 0;
    }
    
    this.currentAction = name;
  }
  
  /**
   * Stop all animations
   */
  stopAll(): void {
    this.mixer.stopAllAction();
    this.currentAction = null;
  }
}

/**
 * Animation utilities
 */
export const animate = {
  /**
   * Create a simple rotation animation
   */
  rotation: (object: THREE.Object3D, speed: number = 1, axis: 'x' | 'y' | 'z' = 'y') => {
    return (delta: number) => {
      object.rotation[axis] += speed * delta;
    };
  },
  
  /**
   * Create a simple bounce animation
   */
  bounce: (object: THREE.Object3D, height: number = 0.5, speed: number = 1) => {
    const startY = object.position.y;
    return (time: number) => {
      object.position.y = startY + Math.abs(Math.sin(time * speed)) * height;
    };
  },
  
  /**
   * Create a simple hover animation
   */
  hover: (object: THREE.Object3D, distance: number = 0.5, speed: number = 1) => {
    const startY = object.position.y;
    return (time: number) => {
      object.position.y = startY + Math.sin(time * speed) * distance;
    };
  },
  
  /**
   * Create a simple pulse animation
   */
  pulse: (object: THREE.Object3D, scale: number = 0.2, speed: number = 1) => {
    const startScale = object.scale.clone();
    return (time: number) => {
      const scaleFactor = 1 + Math.sin(time * speed) * scale;
      object.scale.copy(startScale).multiplyScalar(scaleFactor);
    };
  },
  
  /**
   * Create a simple orbit animation
   */
  orbit: (
    object: THREE.Object3D,
    radius: number = 5,
    speed: number = 1,
    axis: 'x' | 'y' | 'z' = 'y',
    center: THREE.Vector3 = new Vector3()
  ) => {
    const startPos = object.position.clone();
    return (time: number) => {
      const angle = time * speed;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      object.position.copy(center);
      
      if (axis === 'y') {
        object.position.x += x;
        object.position.z += z;
        object.lookAt(center);
      } else if (axis === 'x') {
        object.position.y += x;
        object.position.z += z;
      } else {
        object.position.x += x;
        object.position.y += z;
      }
      
      object.position.add(startPos);
    };
  },
  
  /**
   * Create a simple fade animation
   */
  fade: (
    object: THREE.Object3D & { material?: THREE.Material | THREE.Material[] },
    targetOpacity: number = 0,
    duration: number = 1
  ) => {
    let elapsed = 0;
    let startOpacity: number;
    
    // Get initial opacity
    if (Array.isArray(object.material)) {
      startOpacity = (object.material[0] as any).opacity ?? 1;
    } else if (object.material) {
      startOpacity = (object.material as any).opacity ?? 1;
    } else {
      startOpacity = 1;
    }
    
    return (delta: number) => {
      elapsed += delta;
      const progress = Math.min(elapsed / duration, 1);
      const opacity = startOpacity + (targetOpacity - startOpacity) * progress;
      
      // Set opacity on all materials
      const setOpacity = (material: THREE.Material) => {
        if ('opacity' in material) {
          (material as any).opacity = opacity;
          material.transparent = opacity < 1;
          material.needsUpdate = true;
        }
      };
      
      if (Array.isArray(object.material)) {
        object.material.forEach(setOpacity);
      } else if (object.material) {
        setOpacity(object.material);
      }
      
      return progress >= 1;
    };
  },
  
  /**
   * Create a simple move animation
   */
  move: (
    object: THREE.Object3D,
    target: THREE.Vector3,
    duration: number = 1
  ) => {
    const start = object.position.clone();
    const delta = new Vector3().subVectors(target, start);
    let elapsed = 0;
    
    return (deltaTime: number) => {
      elapsed += deltaTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease in-out
      const t = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      object.position.copy(start).add(delta.clone().multiplyScalar(t));
      
      return progress >= 1;
    };
  },
  
  /**
   * Create a simple scale animation
   */
  scale: (
    object: THREE.Object3D,
    targetScale: THREE.Vector3 | number,
    duration: number = 1
  ) => {
    const startScale = object.scale.clone();
    const target = typeof targetScale === 'number'
      ? new Vector3(targetScale, targetScale, targetScale)
      : targetScale.clone();
      
    const delta = new Vector3().subVectors(target, startScale);
    let elapsed = 0;
    
    return (deltaTime: number) => {
      elapsed += deltaTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out
      const t = 1 - Math.pow(1 - progress, 3);
      
      object.scale.copy(startScale).add(delta.clone().multiplyScalar(t));
      
      return progress >= 1;
    };
  },
  
  /**
   * Chain multiple animations together
   */
  chain: (...animations: Array<(delta: number) => boolean | void>) => {
    let current = 0;
    let isComplete = false;
    
    return (delta: number) => {
      if (isComplete) return true;
      
      const animation = animations[current];
      const result = animation(delta);
      
      if (result === true) {
        current++;
        if (current >= animations.length) {
          isComplete = true;
          return true;
        }
      }
      
      return false;
    };
  },
  
  /**
   * Run animations in parallel
   */
  parallel: (...animations: Array<(delta: number) => boolean | void>) => {
    const status = Array(animations.length).fill(false);
    
    return (delta: number) => {
      let allComplete = true;
      
      animations.forEach((animation, i) => {
        if (!status[i]) {
          const result = animation(delta);
          if (result === true) {
            status[i] = true;
          } else {
            allComplete = false;
          }
        }
      });
      
      return allComplete;
    };
  },
};
