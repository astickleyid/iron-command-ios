import { AStarPathfinder } from '../systems/pathfinding';
import { Vector3 } from 'three';

describe('AStarPathfinder', () => {
  let pathfinder: AStarPathfinder;

  beforeEach(() => {
    pathfinder = new AStarPathfinder(20, 1);
  });

  describe('findPath', () => {
    it('should find a direct path along a straight line over multiple nodes', () => {
      const start = new Vector3(0, 0, 0);
      const goal = new Vector3(3, 0, 0);
      const path = pathfinder.findPath(start, goal);

      expect(path.length).toBeGreaterThan(0);
      expect(path[0].x).toBe(0);
      expect(path[0].z).toBe(0);
      expect(path[path.length - 1].x).toBe(3);
      expect(path[path.length - 1].z).toBe(0);
    });

    it('should return a path from start to goal when route is clear', () => {
      const start = new Vector3(0, 0, 0);
      const goal = new Vector3(5, 0, 5);
      const path = pathfinder.findPath(start, goal);

      expect(path.length).toBeGreaterThan(0);
      expect(path[path.length - 1].x).toBe(5);
      expect(path[path.length - 1].z).toBe(5);
    });

    it('should navigate around obstacles', () => {
      // Add a wall blocking the direct path
      for (let z = 0; z < 10; z++) {
        pathfinder.addObstacle(3, z);
      }

      const start = new Vector3(0, 0, 5);
      const goal = new Vector3(6, 0, 5);
      const path = pathfinder.findPath(start, goal);

      expect(path.length).toBeGreaterThan(0);
      // Path should not pass through x=3 where obstacles are
      const passesObstacle = path.some((p) => p.x === 3 && p.z >= 0 && p.z < 10);
      expect(passesObstacle).toBe(false);
    });

    it('should return empty array when goal is unreachable', () => {
      // Surround the goal completely with obstacles
      pathfinder.addObstacle(5, 5, 2);

      const start = new Vector3(0, 0, 0);
      const goal = new Vector3(5, 0, 5);
      const path = pathfinder.findPath(start, goal);

      // With the goal fully blocked, pathfinder should return no path
      expect(path.length).toBe(0);
    });

    it('should return a single-node path when start equals goal', () => {
      const start = new Vector3(5, 0, 5);
      const goal = new Vector3(5, 0, 5);
      const path = pathfinder.findPath(start, goal);

      expect(path.length).toBe(1);
      expect(path[0].x).toBe(5);
      expect(path[0].z).toBe(5);
    });

    it('should produce path nodes with y=0', () => {
      const start = new Vector3(0, 0, 0);
      const goal = new Vector3(4, 0, 4);
      const path = pathfinder.findPath(start, goal);

      path.forEach((node) => {
        expect(node.y).toBe(0);
      });
    });
  });

  describe('addObstacle', () => {
    it('should block a cell from pathfinding', () => {
      pathfinder.addObstacle(2, 0);

      const start = new Vector3(0, 0, 0);
      const goal = new Vector3(4, 0, 0);
      const path = pathfinder.findPath(start, goal);

      // Path should not go through (2, 0)
      const usesObstacle = path.some((p) => p.x === 2 && p.z === 0);
      expect(usesObstacle).toBe(false);
    });
  });
});
