import Divider from 'antd/lib/divider';
import { FC } from 'react';
import BearsFish from './components/Bears';
import Counter from './components/Counter';
import UserList from './components/UserList';

const App: FC = () => {
  return (
    <div>
      <Counter />
      <Divider />
      <UserList />
      <Divider />
      <BearsFish />
    </div>
  );
};

export default App;
