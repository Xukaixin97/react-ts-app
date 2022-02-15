import { type FC } from 'react';
import CounterApp from './components/Counter';
import UserInfo from './components/UserInfo';

const valtioApp: FC = () => {
  return (
    <>
      <CounterApp />
      <UserInfo />
    </>
  );
};

export default valtioApp;
