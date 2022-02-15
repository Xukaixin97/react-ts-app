import { Button } from 'antd';
import { type FC } from 'react';
import { proxy, useSnapshot } from 'valtio';
import { getUserInfo, type IUser } from '../../api';

interface IState {
  user: IUser | null;
  getUserInfo(): void;
}

const state = proxy<IState>({
  user: null,
  getUserInfo: async () => {
    const { res } = await getUserInfo(1);
    state.user = res;
  },
});

const UserApp: FC = () => {
  const snap = useSnapshot<IState>(state);

  return (
    <div>
      <Button onClick={snap.getUserInfo}> Click</Button>
      <div>name:{snap.user?.name}</div>
    </div>
  );
};

export default UserApp;
