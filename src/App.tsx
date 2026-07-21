import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { Sky, OrbitControls, PointerLockControls } from '@react-three/drei';
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { useGameStore } from './store/gameStore';
import { useResourceStore } from './store/resourceStore';
import { useBuildingStore, BuildingType } from './store/buildingStore';
import { Unit } from './components/UpdatedUnit';
import { Building } from './components/Building';
import { COLORS } from './config/constants';

const BUILDING_COSTS: Record<BuildingType, { credits: number; fuel: number }> = {
  'command-center': { credits: 1000, fuel: 0 },
  'oil-derrick': { credits: 300, fuel: 0 },
  'power-plant': { credits: 400, fuel: 100 },
  'barracks': { credits: 500, fuel: 200 },
  'turret': { credits: 200, fuel: 50 },
};

const GameController: React.FC = () => {
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
      {mode === 'RTS' && (
        <OrbitControls
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.5}
          maxDistance={50}
          minDistance={10}
          enableDamping
          dampingFactor={0.05}
        />
      )}
      {mode === 'FPS' && <PointerLockControls />}
    </>
  );
};

const ResourceProducer: React.FC = () => {
  const { buildings, getTotalPowerConsumption } = useBuildingStore();
  const { addCredits, addFuel, setPowerConsumption, setPowerProduction } = useResourceStore();
  const lastUpdateRef = useRef(Date.now());

  useFrame(() => {
    const now = Date.now();
    const deltaSeconds = (now - lastUpdateRef.current) / 1000;

    if (deltaSeconds >= 1) {
      let totalPowerProduction = 0;

      buildings.forEach((building) => {
        if (building.produces) {
          const amount = building.produces.rate * deltaSeconds;
          if (building.produces.resource === 'credits') addCredits(amount);
          if (building.produces.resource === 'fuel') addFuel(amount);
          if (building.produces.resource === 'power') totalPowerProduction += building.produces.rate;
        }
      });

      setPowerConsumption(getTotalPowerConsumption());
      setPowerProduction(totalPowerProduction);
      lastUpdateRef.current = now;
    }
  });

  return null;
};

const TerrainClickHandler: React.FC = () => {
  const { selectedBuildingType, addBuilding } = useBuildingStore();
  const { consumeCredits, consumeFuel } = useResourceStore();

  const handleTerrainClick = (e: ThreeEvent<MouseEvent>) => {
    if (!selectedBuildingType) return;

    const cost = BUILDING_COSTS[selectedBuildingType];
    if (!consumeCredits(cost.credits) || !consumeFuel(cost.fuel)) {
      alert(`Not enough resources! Need ${cost.credits} credits and ${cost.fuel} fuel`);
      return;
    }

    const position: [number, number, number] = [
      Math.round(e.point.x),
      0,
      Math.round(e.point.z)
    ];

    addBuilding(selectedBuildingType, position);
  };

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      receiveShadow
      onClick={handleTerrainClick}
    >
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color={COLORS.TAN} roughness={1} />
    </mesh>
  );
};

const MobileUI: React.FC = () => {
  const { credits, fuel, powerConsumption, powerProduction } = useResourceStore();
  const { selectedBuildingType, selectBuildingType } = useBuildingStore();
  const [showBuildMenu, setShowBuildMenu] = useState(false);

  const isPowerSufficient = powerProduction >= powerConsumption;

  const canAfford = (type: BuildingType) => {
    const cost = BUILDING_COSTS[type];
    return credits >= cost.credits && fuel >= cost.fuel;
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      <View style={styles.resourceBar}>
        <View style={styles.resourceItem}>
          <Text style={styles.resourceLabel}>💰</Text>
          <Text style={styles.resourceValue}>{Math.floor(credits)}</Text>
        </View>
        <View style={styles.resourceItem}>
          <Text style={styles.resourceLabel}>⛽</Text>
          <Text style={styles.resourceValue}>{Math.floor(fuel)}</Text>
        </View>
        <View style={[styles.resourceItem, !isPowerSufficient && styles.resourceWarning]}>
          <Text style={styles.resourceLabel}>⚡</Text>
          <Text style={styles.resourceValue}>{powerProduction}/{powerConsumption}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.buildButton}
        onPress={() => setShowBuildMenu(!showBuildMenu)}
      >
        <Text style={styles.buildButtonText}>🏗️ BUILD</Text>
      </TouchableOpacity>

      {showBuildMenu && (
        <View style={styles.buildMenu}>
          {(Object.keys(BUILDING_COSTS) as BuildingType[]).map((type) => {
            const cost = BUILDING_COSTS[type];
            const affordable = canAfford(type);
            
            return (
              <TouchableOpacity
                key={type}
                style={[
                  styles.buildMenuItem,
                  !affordable && styles.buildMenuItemDisabled,
                  selectedBuildingType === type && styles.buildMenuItemSelected,
                ]}
                onPress={() => {
                  if (affordable) {
                    selectBuildingType(type);
                    setShowBuildMenu(false);
                  }
                }}
                disabled={!affordable}
              >
                <Text style={styles.buildMenuItemTitle}>
                  {type.replace(/-/g, ' ').toUpperCase()}
                </Text>
                <Text style={styles.buildMenuItemCost}>
                  💰 {cost.credits}  ⛽ {cost.fuel}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {selectedBuildingType && (
        <View style={styles.placementHint}>
          <Text style={styles.placementHintText}>
            Tap terrain to place {selectedBuildingType.replace(/-/g, ' ')}
          </Text>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => selectBuildingType(null)}
          >
            <Text style={styles.cancelButtonText}>❌ CANCEL</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default function IronCommandGame() {
  const { mode } = useGameStore();
  const { buildings } = useBuildingStore();

  return (
    <View style={{ flex: 1 }}>
      <Canvas 
        shadows 
        camera={{ position: [10, 15, 10], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.2} color={COLORS.COLD_BLUE} />
        <directionalLight
          position={[20, 30, 10]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
          color={COLORS.WARM_SUN}
        />
        
        <Sky sunPosition={[20, 30, 10]} turbidity={10} rayleigh={0.5} />

        <TerrainClickHandler />

        <Unit id="u1" position={[0, 0, 0]} />
        <Unit id="u2" position={[5, 0, -5]} />
        <Unit id="u3" position={[-5, 0, -5]} />

        {buildings.map((building) => (
          <Building
            key={building.id}
            id={building.id}
            type={building.type}
            position={building.position}
            health={building.health}
            maxHealth={building.maxHealth}
          />
        ))}

        <GameController />
        <ResourceProducer />
      </Canvas>

      <MobileUI />

      <View style={styles.hud}>
        <Text style={styles.title}>IRON COMMAND</Text>
        <Text style={[styles.modeText, mode === 'FPS' && styles.fpsModeText]}>
          {mode === 'FPS' ? '🎯 FIELD OPERATIVE' : '🗺️ COMMANDER'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  hud: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    pointerEvents: 'none',
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'monospace',
    fontWeight: 'bold',
    fontSize: 28,
    color: COLORS.TAN,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  modeText: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'monospace',
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.OLIVE_DRAB,
    marginTop: 5,
  },
  fpsModeText: {
    color: COLORS.ALERT_ORANGE,
  },
  resourceBar: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 110 : 80,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    pointerEvents: 'none',
  },
  resourceItem: {
    backgroundColor: 'rgba(44, 62, 80, 0.9)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.TAN,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceWarning: {
    borderColor: COLORS.ALERT_ORANGE,
    backgroundColor: 'rgba(255, 69, 0, 0.3)',
  },
  resourceLabel: {
    fontSize: 18,
    marginRight: 5,
  },
  resourceValue: {
    color: COLORS.TAN,
    fontWeight: 'bold',
    fontSize: 16,
  },
  buildButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: COLORS.GUNMETAL_GREY,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: COLORS.TAN,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  buildButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buildMenu: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    backgroundColor: 'rgba(44, 62, 80, 0.95)',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.TAN,
    padding: 10,
    width: 250,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  buildMenuItem: {
    backgroundColor: COLORS.GUNMETAL_GREY,
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.TAN,
  },
  buildMenuItemDisabled: {
    opacity: 0.4,
    borderColor: '#666',
  },
  buildMenuItemSelected: {
    backgroundColor: COLORS.OLIVE_DRAB,
    borderColor: COLORS.ALERT_ORANGE,
    borderWidth: 3,
  },
  buildMenuItemTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 4,
  },
  buildMenuItemCost: {
    color: COLORS.TAN,
    fontSize: 11,
  },
  placementHint: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 180 : 150,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 69, 0, 0.95)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    elevation: 10,
  },
  placementHintText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: COLORS.GUNMETAL_GREY,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
