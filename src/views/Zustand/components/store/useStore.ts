import create from 'zustand';
import createBearSlice, { BearSlice } from './createBearSlice';
import createFishSlice, { FishSlice } from './createFishSlice';

export type MyState = BearSlice & FishSlice;

const useStore = create<MyState>((set, get) => ({
  ...createBearSlice(set, get),
  ...createFishSlice(set, get),
}));

export default useStore;
