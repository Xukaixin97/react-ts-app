import React, { FC } from 'react';
import Bears from './components/Bears';
import Counter from './components/Counter';
import Fishes from './components/Fishes';
import UserList from './components/UserList';

const App: FC = () => {
  return (
    <div>
      <Counter />
      <UserList />
      <Fishes />
      <Bears />
    </div>
  );
};

export default App;
