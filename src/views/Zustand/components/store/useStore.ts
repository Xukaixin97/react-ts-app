import create from 'zustand';
import createBearSlice, { IBearSlice } from './createBearSlice';
import createFishSlice, { IFishSlice } from './createFishSlice';

export type MyState = IBearSlice & IFishSlice;

const useStore = create<MyState>((set, get) => ({
  ...createBearSlice(set, get),
  ...createFishSlice(set, get),
}));

export default useStore;
