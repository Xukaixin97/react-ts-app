import { Avatar } from 'antd'
import { type FC, useContext } from 'react'
import UserContext from './appContext'

const UserApp: FC = () => {
  const { avatar } = useContext(UserContext)

  return <Avatar size={64} src={avatar} />
}
export default UserApp
