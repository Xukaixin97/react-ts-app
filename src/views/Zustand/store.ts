import create, { SetState, StateCreator, StoreApi, type GetState } from 'zustand'
import { persist, devtools, subscribeWithSelector, type StoreApiWithSubscribeWithSelector } from 'zustand/middleware'
import * as api from './api'
import { IUser } from './types'

interface ICounterState {
  count: number
  increaseCount: (count: number) => void
  doubleCount: () => void
  tripleCount: () => void
  deleteEverything: () => void
}

interface IUserState {
  userList: IUser[]
  fetchUserList: () => void
}

export const useStore = create(
  persist(
    (set, get) => ({
      fishes: 0,
      addAFish: () => set({ fishes: get().fishes + 1 }),
    }),
    {
      name: 'food-storage', // unique name
      getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    },
  ),
)

const log =
  <T extends ICounterState, CustomSetState extends SetState<T>, CustomGetState extends GetState<T>, CustomStoreApi extends StoreApi<T>>(
    config: StateCreator<
      T,
      (partial: ((draft: T) => void) | T, replace?: boolean) => void,
      // CustomSetState,
      CustomGetState,
      CustomStoreApi
    >,
  ): StateCreator<T, CustomSetState, CustomGetState, CustomStoreApi> =>
  (set, get, api) =>
    config(
      (args) => {
        console.log('  applying', args)
        set(args)
        console.log('  new state', get())
      },
      get,
      api,
    )

// Log every time state is changed
// const log = config => (set, get, api) => config(args => {
//   console.log("  applying", args)
//   set(args)
//   console.log("  new state", get())
// }, get, api)

// // 使用devtools 持久化数据
// export const useCounterStore = create<ICounterState>(
//   log((set, get) => ({
//     count: 0,
//     increaseCount: (count: number) => set((state) => ({ count: state.count + count })),
//     doubleCount: () => set((state) => ({ count: state.count * 2 })),
//     tripleCount: () => set(() => ({ count: get().count * 2 })),
//     deleteEverything: () => set(() => {}, true),
//   })),
// )

// 使用devtools 持久化数据
export const useCounterStore = create<ICounterState>(
  persist(
    (set, get) => ({
      count: 0,
      increaseCount: (count: number) => set((state) => ({ count: state.count + count })),
      doubleCount: () => set((state) => ({ count: state.count * 2 })),
      tripleCount: () => set({ count: get().count * 2 }),
      deleteEverything: () => set({}, true),
    }),
    {
      name: 'counter',
      getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    },
  ),
)

// export const useCounterStore = create<
//   ICounterState,
//   SetState<ICounterState>,
//   GetState<ICounterState>,
//   StoreApi<ICounterState>
// // StoreApiWithSubscribeWithSelector<ICounterState>
// >(
//   (set, get) => ({
//     count: 0,
//     increaseCount: (count: number) => set((state) => ({ count: state.count + count })),
//     doubleCount: () => set((state) => ({ count: state.count * 2 })),
//     tripleCount: () => set({ count: get().count * 2 }),
//     deleteEverything: () => set({}, true), // clears the entire store, actions included
//   })

//   // 监听数据变化
//   // subscribeWithSelector((set, get) => ({
//   //   count: 0,
//   //   increaseCount: (count: number) => set((state) => ({ count: state.count + count })),
//   //   doubleCount: () => set((state) => ({ count: state.count * 2 })),
//   //   tripleCount: () => set({ count: get().count * 3 }),
//   //   deleteEverything: () => set({}, true),
//   // })),
// );

export const useUserStore = create<IUserState>((set) => ({
  userList: [],
  fetchUserList: async () => {
    const { res: userList } = await api.fetchUserList()
    set({ userList })
  },
}))
