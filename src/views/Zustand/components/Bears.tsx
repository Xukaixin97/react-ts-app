import { Button, Space } from 'antd';
import { type FC } from 'react';
import useStore from './store/useStore';

const Counter: FC = () => {
  const { fishes, eatFish, repopulate } = useStore((state) => ({ ...state }));

  return (
    <div>
      <h1>{`鱼: ${fishes} 条`}</h1>
      <Space size={16}>
        <Button onClick={() => eatFish()}>eat fish</Button>
        <Button onClick={() => repopulate()}>重置</Button>
      </Space>
    </div>
  );
};

export default Counter;
