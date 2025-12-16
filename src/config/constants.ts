export const COLORS = {
  TAN: '#d2b48c',
  OLIVE_DRAB: '#556b2f',
  GUNMETAL_GREY: '#2c3e50',
  ALERT_ORANGE: '#ff4500',
  COLD_BLUE: '#b0c4de',
  WARM_SUN: '#ffd700',
} as const;

export const CAMERA = {
  RTS: {
    FOV: 50,
    MIN_DISTANCE: 10,
    MAX_DISTANCE: 50,
    MIN_POLAR_ANGLE: 0,
    MAX_POLAR_ANGLE: Math.PI / 2.5,
  },
  FPS: {
    FOV: 75,
    HEAD_HEIGHT: 1.8,
    TRANSITION_DURATION: 1.2,
  },
} as const;

export const PERFORMANCE = {
  TARGET_FPS: 60,
  MAX_DRAW_CALLS: 200,
  MAX_POLYGON_BUDGET: 100000,
  MAX_TEXTURE_MEMORY_MB: 512,
} as const;

export const MATERIALS = {
  MILITARY: {
    roughness: 0.8,
    metalness: 0.1,
  },
  CONCRETE: {
    roughness: 1.0,
    metalness: 0.0,
  },
  STEEL: {
    roughness: 0.6,
    metalness: 0.7,
  },
} as const;

export const PHYSICS = {
  GRAVITY: 9.81,
  UNIT_SPEED: 5.0,
  UNIT_RUN_MULTIPLIER: 1.5,
} as const;

export const RESOURCES = {
  CREDITS: 'credits',
  FUEL: 'fuel',
  POWER: 'power',
} as const;
