import create from 'zustand'
import type { IBearSlice } from './createBearSlice'
import createBearSlice from './createBearSlice'
import type { IFishSlice } from './createFishSlice'
import createFishSlice from './createFishSlice'

export type MyState = IBearSlice & IFishSlice

const useStore = create<MyState>((set, get) => ({
  ...createBearSlice(set, get),
  ...createFishSlice(set, get),
}))

export default useStore
