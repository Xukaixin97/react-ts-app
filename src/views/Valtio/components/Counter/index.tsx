import { Button, Input } from 'antd';
import { type FC } from 'react';
import { proxy, subscribe, useSnapshot } from 'valtio';
import { subscribeKey, watch } from 'valtio/utils';

interface IState {
  count: number;
  inc(): void;
  text: string;
  setText(value: string): void;
  user: Object;
}

const state = proxy<IState>({
  count: 0,
  inc: () => {
    ++state.count;
  },
  text: 'hello',
  setText: (value: string) => {
    state.text = value;
  },
  user: {},
});

// Suscribe to all state changes,also subscribe to a portion of state,但是必须是Object类型
subscribe(state.user, () => console.log('state.user has changed to', state.user));

//subscribe to a primitive value of state,
subscribeKey(state, 'count', () => console.log('state.count has changed to', state.count));

watch((get) => {
  console.log('watching state has changed to', get(state));
});

// This will re-render on `state.count` change but not on `state.text` change
const CounterApp: FC = () => {
  const snap = useSnapshot<IState>(state);

  return (
    <div>
      <h1>count: {snap.count}</h1>
      <Button onClick={snap.inc}>+1</Button>
    </div>
  );
};

const TextApp: FC = () => {
  const snap = useSnapshot<IState>(state);

  return (
    <div>
      <h1>Content: {snap.text}</h1>
      <Input onChange={(e) => snap.setText(e.currentTarget.value)} />
    </div>
  );
};

const App: FC = () => {
  return (
    <div>
      <CounterApp />
      <TextApp />
    </div>
  );
};

export default App;
