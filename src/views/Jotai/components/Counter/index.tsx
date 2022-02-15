import { Button } from 'antd';
import { atom, useAtom } from 'jotai';
import { type FC } from 'react';

const countAtom = atom(0);
// const countAtom = atomWithStorage('countAtom', 0);
countAtom.onMount = (setCountAtom) => {
  // atom is mounted in provider
  setCountAtom((c) => (c = c + 21)); // increment count on mount
  //   return () => { ... } // return optional onUnmount function
};

// writable derived atom
// const doubledCountAtom = atom((get) => get(countAtom) * 2);
// Async derived atom
const doubledCountAtom = atom(
  async (get) => {
    await new Promise<string>((resolve, _reject) => {
      setTimeout(() => {
        resolve('some returned value');
      }, 500);
    });
    return get(countAtom);
  },
  async (get, set) => {
    await new Promise<string>((resolve, _reject) => {
      setTimeout(() => {
        resolve('some returned value');
      }, 500);
    });
    return get(countAtom) * 2;
  },
);

// write-only derived atom
const multiplyCountAtom = atom(null, (get, set, by: number) => set(countAtom, get(countAtom) * by));

function Controls() {
  const [, multiply] = useAtom(multiplyCountAtom);
  return (
    <Button onClick={() => multiply(3)} className='ml-2' type='primary'>
      triple
    </Button>
  );
}

export const Counter: FC = () => {
  const [count, setCount] = useAtom(countAtom);
  const [doubledCount] = useAtom(doubledCountAtom);

  return (
    <div>
      <h1>count:{count}</h1>
      <h1>count:{doubledCount}</h1>
      <Button onClick={() => setCount((c) => (c = c + 1))} type='primary'>
        +1
      </Button>
      <Controls />
    </div>
  );
};

export default Counter;
