# GitHub Copilot Instructions for Iron Command

## Project Overview
**Iron Command** is a hybrid RTS/FPS tactical military game for iOS with a "toy soldier diorama" aesthetic. The game features seamless transitions between Commander View (RTS) and Field Operative View (FPS).

## Core Architecture

### Technology Stack
- **Frontend Framework**: React Native / React Three Fiber (R3F)
- **3D Engine**: Three.js
- **State Management**: Zustand
- **Language**: TypeScript
- **Platform**: iOS (React Native)

### Visual Identity
**Palette (Tactical Triad)**:
- Tan: `#d2b48c` (terrain, selection highlights)
- Olive Drab: `#556b2f` (friendly units, foliage)
- Gunmetal Grey: `#2c3e50` (structures, weapons, UI)
- Alert Orange: `#ff4500` (hazards, enemy UI)

**Aesthetic**: Stylized "Toy Soldier" realism - high fidelity with chunky proportions, matte finishes, harsh lighting with sharp shadows.

## Code Style Guidelines

### Naming Conventions
- **Components**: PascalCase (`Unit.tsx`, `CommandCenter.tsx`)
- **Utilities**: camelCase (`assetFactory.ts`, `weaponSway.ts`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_POWER`, `DEFAULT_FOV`)
- **Store Actions**: camelCase verbs (`selectUnit`, `enterFPS`, `exitFPS`)

### File Organization
```
src/
├── components/       # React components (Units, Buildings, UI)
├── systems/          # Game systems (Physics, Audio, AI)
├── store/            # Zustand state management
├── assets/           # 3D models, textures, audio
├── config/           # Game configuration and constants
└── utils/            # Helper functions
```

### TypeScript Standards
- Always use explicit types for function parameters and return values
- Use interfaces for component props and data structures
- Prefer `type` for unions and primitives, `interface` for objects
- Enable strict mode

```typescript
// Good
interface UnitProps {
  id: string;
  position: [number, number, number];
  color?: string;
}

export const Unit: React.FC<UnitProps> = ({ id, position, color = "#556b2f" }) => {
  // ...
}

// Avoid
export const Unit = (props: any) => {
  // ...
}
```

## Game-Specific Rules

### Camera System
- **RTS Mode**: Use `OrbitControls` with constrained polar angle (max: π/2.5)
- **FPS Mode**: Use `PointerLockControls` with custom weapon sway/bob
- **Transition**: Smooth tween (duration: 1.2s, easing: easeInOutCubic)

### Unit Design
All units MUST have:
- `headBone` for FPS camera mounting
- `muzzleBone` for projectile spawn points
- Selection indicator (scale pulse or color shift to Tan)
- Chunky, low-poly aesthetic (favor large primitives over detail)

### Materials
```typescript
// Standard military material
const militaryMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.8,  // Matte finish
  metalness: 0.1,  // Non-reflective
  color: COLORS.OLIVE_DRAB
});
```

### Performance Targets (iOS)
- **Frame Rate**: Maintain 60 FPS on iPhone 12+
- **Draw Calls**: < 200 per frame in RTS mode
- **Polygon Budget**: Max 100k triangles on screen
- **Texture Memory**: < 512MB total

## FPS Mechanics Implementation

### Weapon System Template
```typescript
interface Weapon {
  type: 'hitscan' | 'projectile';
  damage: number;
  fireRate: number;  // rounds per minute
  recoilPattern: Vector3[];
  aimDownSights: {
    fovMultiplier: number;
    transitionTime: number;
  };
}
```

### Aiming Down Sights (ADS)
- Interpolate FOV from default (75°) to weapon-specific value
- Apply vignette effect (opacity: 0.3, radius: 0.6)
- Add procedural sway reduction (multiply by 0.3)

### Recoil System
- Apply camera rotation based on pattern array
- Recovery rate: 0.15 per frame (60 FPS)
- Accumulate horizontal spread on sustained fire

## Building System

### Resource Flow
```typescript
type Resource = 'credits' | 'fuel' | 'power';

interface Building {
  id: string;
  type: BuildingType;
  powerConsumption: number;
  produces?: { resource: Resource; rate: number };
}
```

### Power System Rules
- If `totalPower < totalConsumption`: All buildings operate at 50% efficiency
- Sentry Turrets: Shut down entirely when power insufficient
- Radar dishes: Stop rotating animation

## AI Pathfinding
- Use A* for ground units (grid-based, 1m cells)
- Use flowfield for large groups (10+ units)
- FPS-controlled units ignore AI pathfinding

## Audio Guidelines
- **Combat**: Punchy, realistic weapon sounds (no reverb)
- **UI**: Mechanical clicks, radio static, beeps
- **Ambience**: Diesel engines, distant gunfire, wind

## Testing Standards
- Write unit tests for all game logic (store actions, calculations)
- Use snapshot tests for UI components
- Test FPS controls on physical iOS device (simulator insufficient)

## Comments & Documentation
- Use JSDoc for all exported functions
- Comment complex physics/ballistics calculations
- NO comments for self-explanatory code
- Add TODO comments with your GitHub username

```typescript
/**
 * Calculates bullet drop for projectile weapons using simplified ballistics.
 * @param velocity - Initial muzzle velocity (m/s)
 * @param distance - Target distance (m)
 * @returns Vertical offset in world units
 */
export const calculateBulletDrop = (velocity: number, distance: number): number => {
  const gravity = 9.81;
  const time = distance / velocity;
  return 0.5 * gravity * time * time;
};
```

## Git Workflow
- Branch naming: `feature/`, `bugfix/`, `hotfix/`
- Commits: Use conventional commits (feat:, fix:, refactor:, etc.)
- PRs: Must pass CI/CD and have 1 approval

## Priority Features (Ordered)
1. FPS movement and shooting mechanics
2. Unit AI pathfinding
3. Base building system
4. Resource extraction and flow
5. Vehicle controls (tank turret independence)
6. Advanced ballistics (projectile physics)
7. Cover system
8. Multiplayer networking

## Prohibited Patterns
- ❌ `any` types without justification
- ❌ Inline styles for complex UI (use StyleSheet)
- ❌ Direct DOM manipulation (use React patterns)
- ❌ Magic numbers (define constants)
- ❌ Deep nesting (max 3 levels)

## Questions to Ask
When implementing new features, consider:
- Does this impact frame rate on iOS?
- Can this be pooled/reused to reduce GC pressure?
- Is this accessible in FPS mode?
- Does this follow the "toy soldier" aesthetic?
- How does this behave when power is insufficient?

---

**Remember**: Iron Command is about tactical depth through the RTS/FPS duality. Every feature should enhance either strategic decision-making or moment-to-moment combat skill expression.
