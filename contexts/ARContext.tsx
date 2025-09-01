'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

type ARMode = 'idle' | 'viewing' | 'interacting' | 'menu';
interface ARState {
  isARSupported: boolean;
  isARActive: boolean;
  currentMode: ARMode;
  selectedModel: string | null;
  arSession: XRSession | null;
}

interface ARActions {
  startARSession: () => Promise<void>;
  endARSession: () => void;
  selectModel: (modelUrl: string) => void;
  setARMode: (mode: ARMode) => void;
  launchAR: (modelUrl: string) => void;
}

const ARContext = createContext<ARState & ARActions | undefined>(undefined);

export const ARProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ARState>({
    isARSupported: false,
    isARActive: false,
    currentMode: 'idle',
    selectedModel: null,
    arSession: null,
  });

  useEffect(() => {
    // Check if WebXR is supported
    const checkARSupport = async () => {
      if (navigator.xr) {
        const supported = await navigator.xr.isSessionSupported('immersive-ar');
        setState(prev => ({ ...prev, isARSupported: supported }));
      }
    };

    checkARSupport();
  }, []);

  const startARSession = async () => {
    try {
      if (!navigator.xr) throw new Error('WebXR not supported');
      
      const session = await navigator.xr.requestSession('immersive-ar', {
        optionalFeatures: ['dom-overlay'],
        domOverlay: { root: document.body },
      });

      session.addEventListener('end', () => {
        setState(prev => ({
          ...prev,
          isARActive: false,
          currentMode: 'idle',
          arSession: null,
        }));
      });

      setState(prev => ({
        ...prev,
        isARActive: true,
        currentMode: 'viewing',
        arSession: session,
      }));

    } catch (error) {
      console.error('Failed to start AR session:', error);
    }
  };

  const endARSession = () => {
    if (state.arSession) {
      state.arSession.end();
    }
  };

  const selectModel = (modelUrl: string) => {
    setState(prev => ({
      ...prev,
      selectedModel: modelUrl,
    }));
  };

  const setARMode = (mode: ARMode) => {
    setState(prev => ({
      ...prev,
      currentMode: mode,
    }));
  };

  const launchAR = useCallback((modelUrl: string) => {
    console.log('Launching AR with model:', modelUrl);
    selectModel(modelUrl);
    startARSession().catch(console.error);
  }, [selectModel, startARSession]);

  const value = {
    ...state,
    startARSession,
    endARSession,
    selectModel,
    setARMode,
    launchAR,
  };

  return (
    <ARContext.Provider value={value}>
      {children}
    </ARContext.Provider>
  );
};

export const useAR = () => {
  const context = useContext(ARContext);
  if (context === undefined) {
    throw new Error('useAR must be used within an ARProvider');
  }
  return context;
};
