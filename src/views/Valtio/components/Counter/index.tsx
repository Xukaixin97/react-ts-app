import { Button, Divider, Input } from 'antd';
import { type FC } from 'react';
import { proxy, subscribe, useSnapshot } from 'valtio';
import { subscribeKey, watch } from 'valtio/utils';


export interface IState {
  count: number;
  text: string
}

export const state = proxy<IState>({
  count: 0,
  text: 'hello'
});

// setInterval(() => {
//   ++state.count
// }, 1000)

//Suscribe to a primitive value of state,
subscribeKey(state, 'count', () => console.log('state.count has changed to', state.count));

watch((get) => {
  console.log('watching state has changed to', get(state));
});


const CounterApp: FC = () => {
  const snap = useSnapshot<IState>(state);
  return (
    <div>
      <h1>count: {snap.count}</h1>
      <Button onClick={() => ++state.count}>+1</Button>
    </div>
  );
};

const TextApp: FC = () => {
  const snap = useSnapshot<IState>(state);

  return (
    <div>
      <h1>Content: {snap.text}</h1>
      <Input onChange={(e) => {
        // snap.setText(e.currentTarget.value)
        state.text = e.currentTarget.value
      }} />
    </div>
  );
};

const APP: FC = () => {
  return (
    <>
      <CounterApp />
      <TextApp />
    </>
  )

}



export default APP;
