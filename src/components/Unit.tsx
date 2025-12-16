import React, { useRef } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { PerspectiveCamera, Html } from '@react-three/drei';
import { useGameStore } from '../store/gameStore';
import { COLORS, CAMERA, MATERIALS } from '../config/constants';
import * as THREE from 'three';

export interface UnitProps {
  id: string;
  position: [number, number, number];
  color?: string;
}

export const Unit: React.FC<UnitProps> = ({ 
  id, 
  position, 
  color = COLORS.OLIVE_DRAB 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { mode, selectedUnit, selectUnit, enterFPS } = useGameStore();
  
  const isSelected = selectedUnit === id;
  const isPossessed = isSelected && mode === 'FPS';

  // Animation: Selection pulse
  useFrame((state) => {
    if (isSelected && meshRef.current && !isPossessed) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (mode === 'RTS') {
      selectUnit(id);
    }
  };

  return (
    <group ref={groupRef} position={position} onClick={handleClick}>
      {/* Body - Chunky capsule for "toy soldier" aesthetic */}
      <mesh ref={meshRef} castShadow receiveShadow position={[0, 1, 0]}>
        <capsuleGeometry args={[0.5, 1.5, 4, 8]} />
        <meshStandardMaterial 
          color={isSelected ? COLORS.TAN : color}
          roughness={MATERIALS.MILITARY.roughness}
          metalness={MATERIALS.MILITARY.metalness}
        />
      </mesh>

      {/* Weapon - Visual direction indicator */}
      <mesh position={[0, 1.2, 0.5]} castShadow>
        <boxGeometry args={[0.8, 0.2, 0.2]} />
        <meshStandardMaterial color={COLORS.GUNMETAL_GREY} />
      </mesh>

      {/* Head marker - Simple sphere for low-poly aesthetic */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <sphereGeometry args={[0.4, 8, 6]} />
        <meshStandardMaterial 
          color={isSelected ? COLORS.TAN : color}
          roughness={MATERIALS.MILITARY.roughness}
          metalness={MATERIALS.MILITARY.metalness}
        />
      </mesh>

      {/* RTS UI Overlay - Possession Button */}
      {isSelected && mode === 'RTS' && (
        <Html position={[0, 2.8, 0]} center>
          <button
            style={{
              background: COLORS.GUNMETAL_GREY,
              color: '#fff',
              border: `2px solid ${COLORS.TAN}`,
              padding: '8px 16px',
              fontFamily: "'Black Ops One', sans-serif",
              fontSize: '12px',
              cursor: 'pointer',
              borderRadius: '2px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              pointerEvents: 'auto',
            }}
            onClick={(e) => {
              e.stopPropagation();
              enterFPS();
            }}
          >
            ⚡ POSSESS UNIT
          </button>
        </Html>
      )}

      {/* FPS Camera Mounting Point */}
      {isPossessed && (
        <PerspectiveCamera 
          makeDefault 
          position={[0, CAMERA.FPS.HEAD_HEIGHT, 0]} 
          fov={CAMERA.FPS.FOV} 
        />
      )}
    </group>
  );
};
