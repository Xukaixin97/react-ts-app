import type { ITodo } from './types'
import { Post } from '@/utils'

export const addTodo = async (todo: ITodo) => {
  return Post<ITodo>('http://localhost:3001/todo', todo)
}
