'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import ARViewer with no SSR
const ARViewer = dynamic(() => import('./ARViewer'), { ssr: false });

type ARViewContextType = {
  isARSupported: boolean;
  isViewerOpen: boolean;
  currentModel: string | null;
  openViewer: (modelUrl: string) => void;
  closeViewer: () => void;
  checkARSupport: () => boolean;
};

const ARViewContext = createContext<ARViewContextType | null>(null);

export function ARViewProvider({ children }: { children: ReactNode }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentModel, setCurrentModel] = useState<string | null>(null);
  const [isARSupported, setIsARSupported] = useState(false);
  const router = useRouter();

  // Check for AR support
  useEffect(() => {
    const checkARSupport = async () => {
      if ('xr' in navigator) {
        try {
          // @ts-ignore - WebXR types might not be available
          const supported = await navigator.xr.isSessionSupported('immersive-ar');
          setIsARSupported(supported);
        } catch (e) {
          console.warn('AR not supported:', e);
          setIsARSupported(false);
        }
      }
    };

    checkARSupport();
  }, []);

  const openViewer = (modelUrl: string) => {
    setCurrentModel(modelUrl);
    setIsViewerOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
    setCurrentModel(null);
    document.body.style.overflow = 'auto';
  };

  const checkARSupport = () => {
    return isARSupported;
  };

  return (
    <ARViewContext.Provider
      value={{
        isARSupported,
        isViewerOpen,
        currentModel,
        openViewer,
        closeViewer,
        checkARSupport,
      }}
    >
      {children}
      
      {/* AR Viewer Modal */}
      <AnimatePresence>
        {isViewerOpen && currentModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-6xl">
              <button
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
                onClick={closeViewer}
                aria-label="Close AR Viewer"
              >
                <X className="w-6 h-6" />
              </button>
              <ARViewer modelUrl={currentModel} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ARViewContext.Provider>
  );
}

export function useARView() {
  const context = useContext(ARViewContext);
  if (!context) {
    throw new Error('useARView must be used within an ARViewProvider');
  }
  return context;
}
