import Divider from 'antd/lib/divider'
import { Suspense, type FC } from 'react'
import { atomFamily, RecoilRoot, useRecoilValue } from 'recoil'
import CharacterCounter from './components/CharacterCounter'
import DebugObserve from './components/DebugObserver'
import UserInfo from './components/UserInfo'
// import UserInfo from './components/UserInfo/QueryRefresh';

const elementPositionStateFamily = atomFamily<number[], number>({
  key: 'ElementPosition',
  default: [1, 2],
})

function ElementListItem({ elementID }: { elementID: number }) {
  const position = useRecoilValue(elementPositionStateFamily(elementID))
  return (
    <div className='mt-4'>
      Element: {elementID}
      Position: {position}
    </div>
  )
}

const RecoilApp: FC = () => {
  return (
    <>
      <RecoilRoot>
        <DebugObserve />
        <Divider />
        <CharacterCounter />
        <Divider />
        <Suspense fallback={<div>加载中。。。</div>}>
          <UserInfo />
        </Suspense>
        <Divider />
        <ElementListItem elementID={333} />
        <ElementListItem elementID={444} />
      </RecoilRoot>
    </>
  )
}

export default RecoilApp
