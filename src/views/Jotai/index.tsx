import Divider from 'antd/lib/divider'
import { Provider } from 'jotai'
import { type FC, Suspense } from 'react'
import Counter from './components/Counter'
import TodoApp from './components/Todo'

const JotaiApp: FC = () => {
  return (
    <Provider>
      <Suspense fallback="Loading...">
        <Counter />
        <Divider />
        <TodoApp />
      </Suspense>
    </Provider>
  )
}

export default JotaiApp
