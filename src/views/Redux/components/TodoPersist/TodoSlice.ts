import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { type ITodo, visibleTypes } from '../../types'

interface IInitialState {
  todoList: ITodo[]
  visibleType: string
}

const initialState: IInitialState = {
  todoList: [
    {
      id: '0',
      text: 'Use Redux',
      completed: true,
    },
    {
      id: '2',
      text: 'Use Redux2',
      completed: false,
    },
  ],
  visibleType: visibleTypes.ALL,
}

const todoSlice = createSlice({
  name: 'todoPersist',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todoList.push(action.payload)
    },
    completeIOrCancelTodo: (state, action: PayloadAction<string>) => {
      state.todoList.forEach((item) => {
        if (item.id === action.payload)
          item.completed = !item.completed
      })
    },
    setVisibleType: (state, action: PayloadAction<string>) => {
      state.visibleType = action.payload
    },
  },
})

export const { addTodo, completeIOrCancelTodo, setVisibleType } = todoSlice.actions
export default todoSlice.reducer
