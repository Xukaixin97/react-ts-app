import { Button, Space } from 'antd';
import { type FC } from 'react';
import shallow from 'zustand/shallow';
import useStore from './store/useStore';

const Counter: FC = () => {
  const { bears, addBears } = useStore((state) => ({ bears: state.bears, addBears: state.increaseBears }), shallow);

  return (
    <div>
      <h1>{`熊: ${bears} 只`}</h1>
      <Space size={16}>
        <Button onClick={() => addBears()}>bear +1</Button>
      </Space>
    </div>
  );
};

export default Counter;
