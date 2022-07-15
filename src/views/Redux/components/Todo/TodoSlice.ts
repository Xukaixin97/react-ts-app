import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '../../api'
import { type ITodo, visibleTypes } from '../../types'

interface IInitialState {
  todoList: ITodo[]
  visibleType: string
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
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
  status: 'idle',
  error: '',
}

export const addTodoAsync = createAsyncThunk('todo/addTodoItem', async (todo: ITodo) => {
  const { res } = await api.addTodo(todo)
  return res
})

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todoList.push(action.payload)
    },
    addTodoAsync: (state, action: PayloadAction<ITodo>) => {
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
  extraReducers: (builder) => {
    builder.addCase(addTodoAsync.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.todoList.push(action.payload)
    })
    builder.addCase(addTodoAsync.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  },
})

export const { addTodo, completeIOrCancelTodo, setVisibleType } = todoSlice.actions
export default todoSlice.reducer
