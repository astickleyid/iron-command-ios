import { useGameStore } from '../store/gameStore';

describe('gameStore', () => {
  beforeEach(() => {
    useGameStore.getState().reset();
  });

  describe('initial state', () => {
    it('should start in RTS mode', () => {
      expect(useGameStore.getState().mode).toBe('RTS');
    });

    it('should have no selected unit', () => {
      expect(useGameStore.getState().selectedUnit).toBeNull();
    });

    it('should not be paused', () => {
      expect(useGameStore.getState().isPaused).toBe(false);
    });
  });

  describe('selectUnit', () => {
    it('should select a unit by id', () => {
      useGameStore.getState().selectUnit('unit-1');
      expect(useGameStore.getState().selectedUnit).toBe('unit-1');
    });

    it('should deselect unit when null is passed', () => {
      useGameStore.getState().selectUnit('unit-1');
      useGameStore.getState().selectUnit(null);
      expect(useGameStore.getState().selectedUnit).toBeNull();
    });
  });

  describe('enterFPS', () => {
    it('should switch mode to FPS', () => {
      useGameStore.getState().enterFPS();
      expect(useGameStore.getState().mode).toBe('FPS');
    });
  });

  describe('exitFPS', () => {
    it('should switch mode back to RTS', () => {
      useGameStore.getState().enterFPS();
      useGameStore.getState().exitFPS();
      expect(useGameStore.getState().mode).toBe('RTS');
    });

    it('should clear selected unit when exiting FPS', () => {
      useGameStore.getState().selectUnit('unit-2');
      useGameStore.getState().enterFPS();
      useGameStore.getState().exitFPS();
      expect(useGameStore.getState().selectedUnit).toBeNull();
    });
  });

  describe('togglePause', () => {
    it('should pause the game when not paused', () => {
      useGameStore.getState().togglePause();
      expect(useGameStore.getState().isPaused).toBe(true);
    });

    it('should unpause when already paused', () => {
      useGameStore.getState().togglePause();
      useGameStore.getState().togglePause();
      expect(useGameStore.getState().isPaused).toBe(false);
    });
  });

  describe('reset', () => {
    it('should restore initial state', () => {
      useGameStore.getState().selectUnit('unit-3');
      useGameStore.getState().enterFPS();
      useGameStore.getState().togglePause();

      useGameStore.getState().reset();

      const state = useGameStore.getState();
      expect(state.mode).toBe('RTS');
      expect(state.selectedUnit).toBeNull();
      expect(state.isPaused).toBe(false);
    });
  });
});
