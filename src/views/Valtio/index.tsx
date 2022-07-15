import Divider from 'antd/lib/divider'
import { type FC, Suspense } from 'react'
import CounterApp from './components/Counter'
import UserInfo from './components/UserInfo'

const ValtioApp: FC = () => {
  return (

    <Suspense fallback={<span>waiting...</span>}>
      <CounterApp />
      <Divider />
      <UserInfo />
    </Suspense>
  )
}

export default ValtioApp
