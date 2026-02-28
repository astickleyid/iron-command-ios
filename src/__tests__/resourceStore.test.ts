import { useResourceStore } from '../store/resourceStore';

describe('resourceStore', () => {
  beforeEach(() => {
    useResourceStore.getState().reset();
  });

  describe('initial state', () => {
    it('should start with 500 credits', () => {
      expect(useResourceStore.getState().credits).toBe(500);
    });

    it('should start with 300 fuel', () => {
      expect(useResourceStore.getState().fuel).toBe(300);
    });

    it('should start with 100 power production', () => {
      expect(useResourceStore.getState().powerProduction).toBe(100);
    });

    it('should start with 0 power consumption', () => {
      expect(useResourceStore.getState().powerConsumption).toBe(0);
    });
  });

  describe('addCredits', () => {
    it('should increase credits by the given amount', () => {
      useResourceStore.getState().addCredits(200);
      expect(useResourceStore.getState().credits).toBe(700);
    });
  });

  describe('addFuel', () => {
    it('should increase fuel by the given amount', () => {
      useResourceStore.getState().addFuel(100);
      expect(useResourceStore.getState().fuel).toBe(400);
    });
  });

  describe('addPower', () => {
    it('should increase power production by the given amount', () => {
      useResourceStore.getState().addPower(50);
      expect(useResourceStore.getState().powerProduction).toBe(150);
    });
  });

  describe('consumeCredits', () => {
    it('should deduct credits and return true when sufficient', () => {
      const result = useResourceStore.getState().consumeCredits(100);
      expect(result).toBe(true);
      expect(useResourceStore.getState().credits).toBe(400);
    });

    it('should return false and not deduct when insufficient credits', () => {
      const result = useResourceStore.getState().consumeCredits(1000);
      expect(result).toBe(false);
      expect(useResourceStore.getState().credits).toBe(500);
    });

    it('should succeed when consuming exact amount of credits available', () => {
      const result = useResourceStore.getState().consumeCredits(500);
      expect(result).toBe(true);
      expect(useResourceStore.getState().credits).toBe(0);
    });
  });

  describe('consumeFuel', () => {
    it('should deduct fuel and return true when sufficient', () => {
      const result = useResourceStore.getState().consumeFuel(100);
      expect(result).toBe(true);
      expect(useResourceStore.getState().fuel).toBe(200);
    });

    it('should return false and not deduct when insufficient fuel', () => {
      const result = useResourceStore.getState().consumeFuel(500);
      expect(result).toBe(false);
      expect(useResourceStore.getState().fuel).toBe(300);
    });
  });

  describe('setPowerConsumption', () => {
    it('should update power consumption', () => {
      useResourceStore.getState().setPowerConsumption(75);
      expect(useResourceStore.getState().powerConsumption).toBe(75);
    });
  });

  describe('setPowerProduction', () => {
    it('should update power production', () => {
      useResourceStore.getState().setPowerProduction(200);
      expect(useResourceStore.getState().powerProduction).toBe(200);
    });
  });

  describe('reset', () => {
    it('should restore initial resource state', () => {
      useResourceStore.getState().addCredits(1000);
      useResourceStore.getState().consumeFuel(100);
      useResourceStore.getState().setPowerConsumption(50);

      useResourceStore.getState().reset();

      const state = useResourceStore.getState();
      expect(state.credits).toBe(500);
      expect(state.fuel).toBe(300);
      expect(state.powerConsumption).toBe(0);
      expect(state.powerProduction).toBe(100);
    });
  });
});
