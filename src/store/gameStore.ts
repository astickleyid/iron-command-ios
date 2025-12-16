import { create } from 'zustand';

export type GameMode = 'RTS' | 'FPS';

export interface GameState {
  mode: GameMode;
  selectedUnit: string | null;
  isPaused: boolean;
  
  // Actions
  selectUnit: (id: string | null) => void;
  enterFPS: () => void;
  exitFPS: () => void;
  togglePause: () => void;
  reset: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  mode: 'RTS',
  selectedUnit: null,
  isPaused: false,
  
  // Actions
  selectUnit: (id) => set({ selectedUnit: id }),
  
  enterFPS: () => set({ mode: 'FPS' }),
  
  exitFPS: () => set({ mode: 'RTS', selectedUnit: null }),
  
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  
  reset: () => set({ mode: 'RTS', selectedUnit: null, isPaused: false }),
}));
