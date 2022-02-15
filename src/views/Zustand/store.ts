import create, { SetState, type GetState } from 'zustand';
import { subscribeWithSelector, type StoreApiWithSubscribeWithSelector } from 'zustand/middleware';
import * as api from './api';
import { IUser } from './types';

interface ICounterState {
  count: number;
  increaseCount: (count: number) => void;
  doubleCount: () => void;
  tripleCount: () => void;
}

interface IUserState {
  userList: IUser[];
  fetchUserList: () => void;
}

export const useCounterStore = create<
  ICounterState,
  SetState<ICounterState>,
  GetState<ICounterState>,
  StoreApiWithSubscribeWithSelector<ICounterState>
>(
  //   devtools(
  //     persist(
  //       (set, get) => ({
  //         count: 0,
  //         increaseCount: (count: number) => set((state) => ({ count: state.count + count })),
  //         doubleCount: () => set((state) => ({ count: state.count * 2 })),
  //         tripleCount: () => set({ count: get().count * 2 }),
  //       }),
  //       { name: 'counter' },
  //     ),
  //   ),

  subscribeWithSelector((set, get) => ({
    count: 0,
    increaseCount: (count: number) => set((state) => ({ count: state.count + count })),
    doubleCount: () => set((state) => ({ count: state.count * 2 })),
    tripleCount: () => set({ count: get().count * 2 }),
  })),
);

export const useUserStore = create<IUserState>((set) => ({
  userList: [],
  fetchUserList: async () => {
    const { res: userList } = await api.fetchUserList();
    set({ userList });
  },
}));
