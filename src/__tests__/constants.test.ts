import { COLORS, CAMERA, PERFORMANCE, MATERIALS, PHYSICS, RESOURCES } from '../config/constants';

describe('COLORS', () => {
  it('should define the correct tactical palette values', () => {
    expect(COLORS.TAN).toBe('#d2b48c');
    expect(COLORS.OLIVE_DRAB).toBe('#556b2f');
    expect(COLORS.GUNMETAL_GREY).toBe('#2c3e50');
    expect(COLORS.ALERT_ORANGE).toBe('#ff4500');
  });
});

describe('CAMERA', () => {
  it('should define RTS camera settings', () => {
    expect(CAMERA.RTS.FOV).toBe(50);
    expect(CAMERA.RTS.MIN_DISTANCE).toBe(10);
    expect(CAMERA.RTS.MAX_DISTANCE).toBe(50);
    expect(CAMERA.RTS.MAX_POLAR_ANGLE).toBeCloseTo(Math.PI / 2.5);
  });

  it('should define FPS camera settings', () => {
    expect(CAMERA.FPS.FOV).toBe(75);
    expect(CAMERA.FPS.HEAD_HEIGHT).toBe(1.8);
    expect(CAMERA.FPS.TRANSITION_DURATION).toBe(1.2);
  });
});

describe('PERFORMANCE', () => {
  it('should define iOS performance targets', () => {
    expect(PERFORMANCE.TARGET_FPS).toBe(60);
    expect(PERFORMANCE.MAX_DRAW_CALLS).toBe(200);
    expect(PERFORMANCE.MAX_POLYGON_BUDGET).toBe(100000);
    expect(PERFORMANCE.MAX_TEXTURE_MEMORY_MB).toBe(512);
  });
});

describe('MATERIALS', () => {
  it('should define military material with matte finish', () => {
    expect(MATERIALS.MILITARY.roughness).toBe(0.8);
    expect(MATERIALS.MILITARY.metalness).toBe(0.1);
  });

  it('should define concrete material properties', () => {
    expect(MATERIALS.CONCRETE.roughness).toBe(1.0);
    expect(MATERIALS.CONCRETE.metalness).toBe(0.0);
  });
});

describe('PHYSICS', () => {
  it('should define gravity constant', () => {
    expect(PHYSICS.GRAVITY).toBe(9.81);
  });

  it('should define unit movement speeds', () => {
    expect(PHYSICS.UNIT_SPEED).toBe(5.0);
    expect(PHYSICS.UNIT_RUN_MULTIPLIER).toBe(1.5);
  });
});

describe('RESOURCES', () => {
  it('should define resource type names', () => {
    expect(RESOURCES.CREDITS).toBe('credits');
    expect(RESOURCES.FUEL).toBe('fuel');
    expect(RESOURCES.POWER).toBe('power');
  });
});
