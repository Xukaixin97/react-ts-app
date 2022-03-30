import { Button } from 'antd';
import { type FC } from 'react';
import { proxy, subscribe, useSnapshot } from 'valtio';
import { getUserInfo, type IUser } from '../../api';

interface IState {
  user: IUser;
  getUserInfo(): void;
}

const state = proxy<IState>({
  user: {} as IUser,
  getUserInfo: async () => {
    const { res } = await getUserInfo(1);
    state.user = res;
  },
});

// Suscribe to all state changes,also subscribe to a portion of state,但是必须是Object类型
subscribe(state.user, () => console.log('state.user has changed to', state.user));

const UserApp: FC = () => {
  const snap = useSnapshot<IState>(state);

  return (
    <>
      <div>name:{snap.user.name}</div>
      <Button onClick={snap.getUserInfo}> 获取用户信息</Button>
    </>
  );
};

export default UserApp;
