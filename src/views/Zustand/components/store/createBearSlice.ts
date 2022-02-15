import { GetState, SetState } from 'zustand';
import { MyState } from './useStore';

export interface BearSlice {
  bears: number;
  increaseBears: () => void;
  eatFish: () => void;
}

const createBearSlice = (set: SetState<MyState>, get: GetState<MyState>) => ({
  bears: 0,
  increaseBears: () => {
    set((s) => ({ bears: s.bears + 1 }));
  },
  eatFish: () => {
    set((prev) => ({ fishes: prev.fishes > 1 ? prev.fishes - 1 : 0 }));
  },
});

export default createBearSlice;
