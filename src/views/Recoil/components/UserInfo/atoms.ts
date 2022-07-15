import { atom } from 'recoil'

export const userIdState = atom<number>({
  key: 'userId',
  default: 0,
})
