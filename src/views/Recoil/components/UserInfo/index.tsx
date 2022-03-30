import { Button } from 'antd';
import { FC } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue } from 'recoil';
import { userIdState } from './atoms';
import { userInfoListSelector, userInfoSelector } from './selectors';

const UserDetail: FC = () => {
  const userInfo = useRecoilValue(userInfoSelector);
  const refreshUserInfo = useRecoilRefresher_UNSTABLE(userInfoSelector);

  return (
    <div >
      <div>name: {userInfo?.name}</div>
      <div>age: {userInfo?.age}</div>
      <Button
        onClick={() => {
          refreshUserInfo();
        }}
        className='mb-2'
      >
        Refresh
      </Button>
    </div>
  );
};

const UserList: FC = () => {
  const userInfoList = useRecoilValue(userInfoListSelector);
  const [, setCurrentUserId] = useRecoilState(userIdState);

  return (
    <ul>
      {userInfoList.map((userInfo) => (
        <li key={userInfo.id} className='mb-2'>
          <Button onClick={() => setCurrentUserId(userInfo.id)}>{userInfo.name}</Button>
        </li>
      ))}
    </ul>
  );
};

const UserInfo: FC = () => {
  return (
    <>
      <UserDetail />
      <UserList />
    </>
  );
};

export default UserInfo;
