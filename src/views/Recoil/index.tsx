import { Suspense, type FC } from 'react';
import { atomFamily, RecoilRoot, useRecoilValue } from 'recoil';
import CharacterCounter from './components/CharacterCounter';
import DebugObserve from './components/DebugObserver';
import UserInfo from './components/UserInfo';
// import UserInfo from './components/UserInfo/QueryRefresh';

const elementPositionStateFamily = atomFamily<number[], number>({
  key: 'ElementPosition',
  default: [1, 2, 0],
});

function ElementListItem({ elementID }: { elementID: number }) {
  console.log('elementID', elementID);
  const position = useRecoilValue(elementPositionStateFamily(elementID));
  return (
    <div>
      Element: {elementID}
      Position: {position}
    </div>
  );
}

const RecoilApp: FC = () => {
  return (
    <RecoilRoot>
      <DebugObserve />
      <ElementListItem elementID={333} />

      <CharacterCounter />
      <Suspense fallback={<div>加载中。。。</div>}>
        <UserInfo />
      </Suspense>
    </RecoilRoot>
  );
};

export default RecoilApp;
