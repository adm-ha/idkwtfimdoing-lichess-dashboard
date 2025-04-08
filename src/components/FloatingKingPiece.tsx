// src/components/FloatingKingPiece.tsx

import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage } from '@react-three/drei';
import * as THREE from 'three';

function Model() { // Removed unused props
  const groupRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF('/models/king.glb');
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Define colors using useMemo inside the component
  const colorWhite = useMemo(() => new THREE.Color(0xffffff), []); // Now used
  const colorBlack = useMemo(() => new THREE.Color(0x333333), []); // Now used

  // *** RESTORED useFrame LOGIC ***
  useFrame((state, delta) => { // state and delta are now used
    if (groupRef.current) {
      // Rotation
      groupRef.current.rotation.y += delta * 0.3; // Use delta

      // Color animation: Black -> White -> Black loop
      // Use state.clock.elapsedTime
      const alpha = (Math.cos(state.clock.elapsedTime * 0.4) + 1) / 2; // Slower speed

      groupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material instanceof THREE.MeshStandardMaterial) {
           const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
           // Use colorWhite and colorBlack
           material.color.lerpColors(colorWhite, colorBlack, alpha); // Starts Black
        }
      });
    }
  });
  // *** END RESTORED LOGIC ***

  return (
      <primitive
          ref={groupRef}
          object={clonedScene}
          scale={0.8}
          // Removed props spread
       />
   );
}

const FloatingKingPiece: React.FC = () => {
  return (
    // Positioning: Vertically Centered, Slightly Inset Right
    <div className="fixed top-1/2 right-10 -translate-y-1/2 w-40 h-40 md:w-52 md:h-52 z-30 pointer-events-none">
      <Canvas shadows camera={{ fov: 45, position: [0, 1, 3] }} style={{ pointerEvents: 'auto' }}>
         <Suspense fallback={null}>
            <Stage environment="city" intensity={0.5} adjustCamera preset="rembrandt">
                  <Model />
             </Stage>
         </Suspense>
      </Canvas>
    </div>
  );
};

useGLTF.preload('/models/king.glb');
export default FloatingKingPiece;
