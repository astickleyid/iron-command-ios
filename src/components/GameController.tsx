import React, { useEffect } from 'react';
import { OrbitControls, PointerLockControls } from '@react-three/drei';
import { useGameStore } from '../store/gameStore';
import { CAMERA } from '../config/constants';

export const GameController: React.FC = () => {
  const { mode, exitFPS } = useGameStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape' && mode === 'FPS') {
        exitFPS();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, exitFPS]);

  return (
    <>
      {/* RTS Controls: High-angle orbit camera */}
      {mode === 'RTS' && (
        <OrbitControls
          minPolarAngle={CAMERA.RTS.MIN_POLAR_ANGLE}
          maxPolarAngle={CAMERA.RTS.MAX_POLAR_ANGLE}
          maxDistance={CAMERA.RTS.MAX_DISTANCE}
          minDistance={CAMERA.RTS.MIN_DISTANCE}
          enableDamping
          dampingFactor={0.05}
        />
      )}

      {/* FPS Controls: Pointer lock for direct control */}
      {mode === 'FPS' && <PointerLockControls />}
    </>
  );
};
