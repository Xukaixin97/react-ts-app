import { Post } from '@/utils';
import { ITodo } from './types';

export const addTodo = async (todo: ITodo) => {
  return Post<ITodo>(`http://localhost:3001/todo`, todo);
};
