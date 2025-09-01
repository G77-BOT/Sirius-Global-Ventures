'use client';

import ARCardEnhanced from '@/components/ar/ARCardEnhanced';

export default function ARCardTestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">AR Card Component Test</h1>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Basic Card</h2>
            <ARCardEnhanced
              title="3D Model Test"
              description="This is a test of the 3D model viewer"
              modelUrl="/models/example.glb"
              className="w-full h-96"
            />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">With Custom Scale</h2>
            <ARCardEnhanced
              title="Scaled Model"
              description="This model has custom scale and position"
              modelUrl="/models/example.glb"
              scale={0.5}
              position={[0, -1, 0]}
              className="w-full h-96"
            />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">With AR Disabled</h2>
            <ARCardEnhanced
              title="AR Disabled"
              description="This card has AR button disabled"
              modelUrl="/models/example.glb"
              showARButton={false}
              className="w-full h-96"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
