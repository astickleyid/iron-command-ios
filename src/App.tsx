import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { useGameStore } from './store/gameStore';
import { Unit } from './components/Unit';
import { GameController } from './components/GameController';
import { COLORS } from './config/constants';

export default function IronCommandPrototype() {
  const { mode } = useGameStore();

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas 
        shadows 
        camera={{ position: [10, 15, 10], fov: 50 }}
        gl={{ antialias: true }}
      >
        {/* Lighting - Harsh military atmosphere */}
        <ambientLight intensity={0.2} color={COLORS.COLD_BLUE} />
        <directionalLight
          position={[20, 30, 10]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
          color={COLORS.WARM_SUN}
        />
        
        {/* Sky - Desert atmosphere */}
        <Sky 
          sunPosition={[20, 30, 10]} 
          turbidity={10} 
          rayleigh={0.5}
        />

        {/* Terrain - Scorched desert floor */}
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          receiveShadow
          position={[0, 0, 0]}
        >
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial 
            color={COLORS.TAN} 
            roughness={1.0}
          />
        </mesh>

        {/* Units - Starting squad */}
        <Unit id="u1" position={[0, 0, 0]} />
        <Unit id="u2" position={[5, 0, -5]} />
        <Unit id="u3" position={[-5, 0, -5]} />

        {/* Game controls logic */}
        <GameController />
      </Canvas>

      {/* HUD Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          fontFamily: "'Black Ops One', sans-serif",
          color: COLORS.TAN,
          textShadow: '0 0 10px #000',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>IRON COMMAND</h1>
        <h3
          style={{
            margin: '10px 0',
            color: mode === 'FPS' ? COLORS.ALERT_ORANGE : COLORS.OLIVE_DRAB,
            fontSize: '1.2rem',
          }}
        >
          MODE: {mode === 'FPS' ? 'FIELD OPERATIVE' : 'COMMANDER'}
        </h3>
        {mode === 'FPS' && (
          <p style={{ fontSize: '0.9rem' }}>
            WASD to Move | Mouse to Look | Click to Fire | ESC to Eject
          </p>
        )}
      </div>

      {/* FPS Crosshair */}
      {mode === 'FPS' && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '4px',
            height: '4px',
            background: COLORS.ALERT_ORANGE,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: '2px solid white',
            pointerEvents: 'none',
            boxShadow: '0 0 10px rgba(255,69,0,0.8)',
          }}
        />
      )}

      {/* Load custom fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}
