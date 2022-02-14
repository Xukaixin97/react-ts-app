import { Button } from 'antd';
import React, { FC } from 'react';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

let store = (set) => ({
  count: 1,
  name: 'lili',
  inc: () => set((state) => ({ count: state.count + 1 })),
  cName: () => set((state) => ({ name: 'lili' })),
});

store = devtools(store);
store = persist(store, { name: 'counter' });

const useStore = create(store);

function Controls() {
  const inc = useStore((state) => state.inc);
  return <button onClick={inc}>one up</button>;
}

function Counter() {
  const count = useStore((state) => state.count);
  return <h1>{count}</h1>;
}

const App: FC = () => {
  //   const name = useStore((state) => state.name);
  const { name } = useStore();
  const cName = useStore((state) => state.cName);

  return (
    <div>
      <h1>{name}</h1>{' '}
      <Button onClick={cName} type='primary'>
        change name
      </Button>
      <Controls />
      <Counter />
    </div>
  );
};

export default App;
