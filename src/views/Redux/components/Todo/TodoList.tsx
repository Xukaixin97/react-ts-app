import { Radio, Space } from 'antd'
import { type FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../hook'
import { visibleTypes } from '../../types'
import TodoItem from './TodoItem'
import { setVisibleType } from './TodoSlice'

const VisibleTypeList: FC = () => {
  const currentVisibleType = useAppSelector(state => state.todo.visibleType)
  const dispatch = useAppDispatch()

  return (
    <Radio.Group
      value={currentVisibleType}
      buttonStyle="solid"
      onChange={e => dispatch(setVisibleType(e.target.value))}
    >
      <Radio.Button value={visibleTypes.ALL}>{visibleTypes.ALL}</Radio.Button>
      <Radio.Button value={visibleTypes.ACTIVE}>{visibleTypes.ACTIVE}</Radio.Button>
      <Radio.Button value={visibleTypes.COMPLETED}>{visibleTypes.COMPLETED}</Radio.Button>
    </Radio.Group>
  )
}

const TodoList: FC = () => {
  const currentVisibleType = useAppSelector(state => state.todo.visibleType)

  const todoList = useAppSelector((state) => {
    const { todoList } = state.todo
    switch (currentVisibleType) {
      case visibleTypes.ACTIVE:
        return todoList.filter(todo => !todo.completed)
      case visibleTypes.COMPLETED:
        return todoList.filter(todo => todo.completed)
      default:
        return todoList
    }
  })

  return (
    <Space direction="vertical">
      <VisibleTypeList />
      {todoList.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </Space>
  )
}

export default TodoList
