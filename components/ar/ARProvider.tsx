'use client';

import { createContext, useContext, ReactNode, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type ARContextType = {
  isARSupported: boolean;
  startARSession: (modelUrl: string) => void;
  checkARSupport: () => boolean;
};

const ARContext = createContext<ARContextType | null>(null);

export function ARProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const isARSupported = useRef<boolean>(false);

  useEffect(() => {
    // Check for WebXR support
    const checkSupport = async () => {
      if ('xr' in navigator) {
        try {
          // @ts-ignore - WebXR types might not be available
          isARSupported.current = await navigator.xr.isSessionSupported('immersive-ar');
        } catch (e) {
          console.warn('AR not supported:', e);
          isARSupported.current = false;
        }
      }
    };

    checkSupport();
  }, []);

  const startARSession = (modelUrl: string) => {
    if (!isARSupported.current) {
      alert('AR is not supported on this device');
      return;
    }
    
    // Store the model URL in session storage for the AR page
    sessionStorage.setItem('arModelUrl', modelUrl);
    
    // Navigate to AR view page
    router.push('/ar-view');
  };

  const checkARSupport = () => {
    return isARSupported.current;
  };

  return (
    <ARContext.Provider value={{ isARSupported: isARSupported.current, startARSession, checkARSupport }}>
      {children}
    </ARContext.Provider>
  );
}

export function useAR() {
  const context = useContext(ARContext);
  if (!context) {
    throw new Error('useAR must be used within an ARProvider');
  }
  return context;
}
