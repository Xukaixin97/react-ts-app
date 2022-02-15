import { Button, Input, Space } from 'antd';
import { nanoid } from 'nanoid';
import { useState, type FC } from 'react';
import { useAppDispatch } from '../../hook';
import TodoList from './TodoList';
import { addTodo } from './TodoSlice';

const TodoInput: FC = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');

  return (
    <Input.Group compact>
      <Input style={{ width: 200 }} value={text} onChange={(e) => setText(e.target.value)} />
      <Button type='primary' onClick={() => dispatch(addTodo({ id: nanoid(), text, completed: false }))}>
        +
      </Button>
    </Input.Group>
  );
};

const TodoApp: FC = () => {
  return (
    <Space direction='vertical'>
      <TodoInput />
      <TodoList />
    </Space>
  );
};

export default TodoApp;
