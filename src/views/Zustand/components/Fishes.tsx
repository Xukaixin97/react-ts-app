import { type FC } from 'react';
import useStore from './store/useStore';

const Fishes: FC = () => {
  const fishes = useStore((state) => state.fishes);
  //   const { fishes } = useStore((state) => ({ fishes: state.fishes }), shallow);

  return (
    <div>
      <h1>{`鱼: ${fishes} 条`}</h1>
    </div>
  );
};

export default Fishes;
