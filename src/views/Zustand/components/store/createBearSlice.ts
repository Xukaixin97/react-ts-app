import type { GetState, SetState } from 'zustand'
import type { MyState } from './useStore'

export interface IBearSlice {
  eatFish: () => void
}

const createBearSlice = (set: SetState<MyState>, get: GetState<MyState>) => ({
  eatFish: () => {
    set(prev => ({ fishes: prev.fishes > 1 ? prev.fishes - 1 : 0 }))
  },
})

export default createBearSlice
