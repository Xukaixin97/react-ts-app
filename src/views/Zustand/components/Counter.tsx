import { Button, Space } from 'antd';
import { type FC } from 'react';
import { useCounterStore } from '../store';

// // Getting non-reactive fresh state
// const count = useCounterStore.getState();

// // Listening to all changes, fires synchronously on every change
// const unsub1 = useCounterStore.subscribe(
//   (state) => state.count,
//   (paw, previousPaw) => console.log(paw, previousPaw),
//   { fireImmediately: true },
// );

// // Updating state, will trigger listeners
// useCounterStore.setState({ count: 2 });
// // Unsubscribe listeners
// unsub1();
// // // Destroying the store (removing all listeners)
// useCounterStore.destroy();


const Counter: FC = () => {
  const { count, increaseCount, doubleCount, tripleCount, deleteEverything } = useCounterStore();

  return (
    <div>
      <h1>{count}</h1>
      <Space size={16}>
        <Button onClick={() => increaseCount(1)}>+1</Button>
        <Button onClick={() => doubleCount()}>x2</Button>
        <Button onClick={() => tripleCount()}>x3</Button>
        <Button onClick={() => deleteEverything()}>clear store</Button>
      </Space>
    </div>
  );
};

export default Counter;
