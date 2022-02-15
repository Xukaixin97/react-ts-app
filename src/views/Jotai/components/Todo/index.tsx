import { CloseOutlined } from '@ant-design/icons';
import { a, useTransition } from '@react-spring/web';
import { Radio } from 'antd';
import { atom, useAtom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { nanoid } from 'nanoid';
import * as React from 'react';

type Param = { id: string; title?: string };

const todoAtomFamily = atomFamily(
  (param: Param) => atom({ title: param.title || 'No title', completed: false }),
  (a: Param, b: Param) => a.id === b.id,
);

const filterAtom = atom('all');
const todosAtom = atom<string[]>([]);
const filteredAtom = atom((get) => {
  const filter = get(filterAtom);
  const todos = get(todosAtom);
  if (filter === 'all') return todos;
  else if (filter === 'completed') return todos.filter((id) => get(todoAtomFamily({ id })).completed);
  else return todos.filter((id) => !get(todoAtomFamily({ id })).completed);
});

const TodoItem: React.FC<{
  id: string;
  remove: (id: string) => void;
}> = ({ id, remove }) => {
  const [item, setItem] = useAtom(todoAtomFamily({ id }));
  const toggleCompleted = () => setItem({ ...item, completed: !item.completed });
  return (
    <>
      <input type='checkbox' checked={item?.completed} onChange={toggleCompleted} />
      <span style={{ textDecoration: item?.completed ? 'line-through' : '' }}>{item?.title}</span>
      <CloseOutlined onClick={() => remove(id)} />
    </>
  );
};

const Filter: React.FC = () => {
  const [filter, set] = useAtom(filterAtom);
  return (
    <Radio.Group onChange={(e) => set(e.target.value)} value={filter}>
      <Radio value='all'>All</Radio>
      <Radio value='completed'>Completed</Radio>
      <Radio value='incompleted'>Incompleted</Radio>
    </Radio.Group>
  );
};

const Filtered: React.FC<{
  remove: (id: string) => void;
}> = ({ remove }) => {
  const [todos] = useAtom(filteredAtom);
  const transitions = useTransition(todos, {
    keys: (id: string) => id,
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 40 },
    leave: { opacity: 0, height: 0 },
  });
  return transitions((style, id) => (
    <a.div className='item' style={style}>
      <TodoItem id={id} remove={remove} />
    </a.div>
  ));
};

const TodoList = () => {
  const [, setTodos] = useAtom(todosAtom);

  const remove = (id: string) => {
    setTodos((prev) => prev.filter((item) => item !== id));
    todoAtomFamily.remove({ id });
  };

  const add = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.inputTitle.value;
    e.currentTarget.inputTitle.value = '';
    const id = nanoid();
    todoAtomFamily({ id, title });
    setTodos((prev) => [...prev, id]);
  };
  return (
    <form onSubmit={add}>
      <Filter />
      <input name='inputTitle' placeholder='Type ...' />
      <Filtered remove={remove} />
    </form>
  );
};

export default function App() {
  return <TodoList />;
}
