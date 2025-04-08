// src/components/FloatingQueenPiece.tsx

import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage } from '@react-three/drei';
import * as THREE from 'three';

function Model(props: any) {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF('/models/queen.glb');
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const colorWhite = useMemo(() => new THREE.Color(0xffffff), []);
  const colorBlack = useMemo(() => new THREE.Color(0x333333), []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.65;
      const alpha = (Math.cos(state.clock.elapsedTime * 0.5) + 1) / 2;
      groupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material instanceof THREE.MeshStandardMaterial) {
           const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
           material.color.lerpColors(colorBlack, colorWhite, alpha); // Starts White
        }
      });
    }
  });

  return ( <primitive ref={groupRef} object={clonedScene} scale={0.8} {...props} /> );
}

const FloatingQueenPiece: React.FC = () => {
  return (
    // *** UPDATED POSITIONING: Vertically Centered, Far Left ***
    <div className="fixed top-1/2 left-0 -translate-y-1/2 w-40 h-40 md:w-52 md:h-52 z-0 pointer-events-none"> {/* Back to left-4 */}
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

useGLTF.preload('/models/queen.glb');
export default FloatingQueenPiece;
