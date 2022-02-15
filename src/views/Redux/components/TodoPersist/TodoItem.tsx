import { Checkbox } from 'antd';
import { type FC } from 'react';
import { useAppDispatch } from '../../hook';
import { ITodo } from '../../types';
import { completeIOrCancelTodo } from './TodoSlice';
interface IProps {
  todo: ITodo;
}

const TodoItem: FC<IProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  return (
    <Checkbox checked={todo.completed} onChange={() => dispatch(completeIOrCancelTodo(todo.id))}>
      {todo.text}
    </Checkbox>
  );
};

export default TodoItem;
