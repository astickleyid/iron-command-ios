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

export const Unit: React.FC<UnitProps> = ({ id, position, color = COLORS.OLIVE_DRAB }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  // Current implementation uses static positioning - pathfinding will be added in Phase 2
  const currentPos = new THREE.Vector3(...position);
  // TODO: Phase 2 - Enable pathfinding: const targetPath: THREE.Vector3[] = [];
  // TODO: Phase 2 - Enable pathfinding: const pathIndex = 0;
  
  const { mode, selectedUnit, selectUnit, enterFPS } = useGameStore();
  const isSelected = selectedUnit === id;
  const isPossessed = isSelected && mode === 'FPS';

  useFrame((state) => {
    if (!groupRef.current) return;

    if (isSelected && meshRef.current && !isPossessed) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }

    // TODO: Phase 2 - Re-enable pathfinding movement when AI system is implemented
    // if (targetPath.length > 0 && pathIndex < targetPath.length && mode === 'RTS') {
    //   const target = targetPath[pathIndex];
    //   const direction = target.clone().sub(currentPos).normalize();
    //   const distance = currentPos.distanceTo(target);
    //   
    //   if (distance > 0.1) {
    //     const moveSpeed = 2 * delta;
    //     currentPos.add(direction.multiplyScalar(moveSpeed));
    //     groupRef.current.position.copy(currentPos);
    //   } else {
    //     setPathIndex(pathIndex + 1);
    //   }
    // }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (mode === 'RTS') {
      selectUnit(id);
    }
  };

  // TODO: Re-enable pathfinding in Phase 2 when AI system is implemented
  // Feature flag: ENABLE_PATHFINDING
  // Tracking issue: https://github.com/astickleyid/iron-command-ios/issues/TBD
  // 
  // const moveTo = (target: THREE.Vector3) => {
  //   const path = pathfinder.findPath(currentPos, target);
  //   if (path.length > 0) {
  //     setTargetPath(path);
  //     setPathIndex(0);
  //   }
  // };

  return (
    <group ref={groupRef} position={currentPos.toArray() as [number, number, number]} onClick={handleClick}>
      <mesh ref={meshRef} castShadow receiveShadow position={[0, 1, 0]}>
        <capsuleGeometry args={[0.5, 1.5, 4, 8]} />
        <meshStandardMaterial color={isSelected ? COLORS.TAN : color} roughness={MATERIALS.MILITARY.roughness} metalness={MATERIALS.MILITARY.metalness} />
      </mesh>
      <mesh position={[0, 1.2, 0.5]} castShadow>
        <boxGeometry args={[0.8, 0.2, 0.2]} />
        <meshStandardMaterial color={COLORS.GUNMETAL_GREY} />
      </mesh>
      <mesh position={[0, 2.2, 0]} castShadow>
        <sphereGeometry args={[0.4, 8, 6]} />
        <meshStandardMaterial color={isSelected ? COLORS.TAN : color} roughness={MATERIALS.MILITARY.roughness} metalness={MATERIALS.MILITARY.metalness} />
      </mesh>
      {isSelected && mode === 'RTS' && (
        <Html position={[0, 2.8, 0]} center>
          <button style={{ background: COLORS.GUNMETAL_GREY, color: '#fff', border: `2px solid ${COLORS.TAN}`, padding: '8px 16px', fontFamily: "'Black Ops One', sans-serif", fontSize: '12px', cursor: 'pointer', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '1px', pointerEvents: 'auto' }} onClick={(e) => { e.stopPropagation(); enterFPS(); }}>⚡ POSSESS UNIT</button>
        </Html>
      )}
      {isPossessed && <PerspectiveCamera makeDefault position={[0, CAMERA.FPS.HEAD_HEIGHT, 0]} fov={CAMERA.FPS.FOV} />}
    </group>
  );
};
