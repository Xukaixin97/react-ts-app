import { Space } from 'antd'
import { type FC } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import Todo from './components/Todo'
import TodoPersist from './components/TodoPersist'
import { store } from './store'

const persistor = persistStore(store)

const reduxApp: FC = () => {
  return (
    <Provider store={store}>
      <Space align="start">
        <Todo />
        <PersistGate persistor={persistor}>
          <TodoPersist />
        </PersistGate>
      </Space>
    </Provider>
  )
}

export default reduxApp
