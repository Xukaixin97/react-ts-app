import { selector, selectorFamily } from 'recoil';
import * as api from '../../api';
import { userIdState } from './atoms';

export const userInfoListSelector = selector({
  key: 'userInfo',
  get: async ({}) => {
    const { res } = await api.getUserList();
    return res;
  },
});

export const userInfoSelector = selector({
  key: 'currentUserInfo',
  get: async ({ get }) => {
    const id = get(userIdState);
    if (!id) return;
    const { res } = await api.getUserInfo(id);
    return res;
  },
});

export const userInfoSelectorFamily = selectorFamily({
  key: 'currentUserInfo',
  get: (userId: number) => async () => {
    if (!userId) return;
    const { res } = await api.getUserInfo(userId);
    return res;
  },
});
