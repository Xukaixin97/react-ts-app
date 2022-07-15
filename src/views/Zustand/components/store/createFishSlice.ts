import type { GetState, SetState } from 'zustand'
import type { MyState } from './useStore'

export interface IFishSlice {
  fishes: number
  repopulate: () => void
}

const createFishSlice = (set: SetState<MyState>, get: GetState<MyState>) => ({
  fishes: 10,
  repopulate: () => {
    set(prev => ({ fishes: 10 }))
  },
})

export default createFishSlice
