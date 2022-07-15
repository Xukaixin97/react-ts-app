import { Button } from 'antd'
import { type FC } from 'react'
import shallow from 'zustand/shallow'
import { useUserStore } from '../store'

const User: FC = () => {
  const { userList, fetchUserList } = useUserStore(state => ({ ...state }), shallow)

  return (
    <div className="mt-4">
      <Button onClick={fetchUserList} type="primary">
        获取用户列表
      </Button>

      {userList.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </div>
  )
}

export default User
