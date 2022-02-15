import { Provider } from 'jotai';
import { Suspense, type FC } from 'react';
import Counter from './components/Counter';
import TodoApp from './components/Todo';

const JotaiApp: FC = () => {
  return (
    <Provider>
      <Suspense fallback='Loading...'>
        <Counter />
        <TodoApp />
      </Suspense>
    </Provider>
  );
};

export default JotaiApp;
