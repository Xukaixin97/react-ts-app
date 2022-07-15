import { Button } from 'antd'
import { type FC, useContext } from 'react'
import UserContext, { SetAvatarContext, useAvatarContext } from './appContext'
import UserApp from './User'

const avatarList = [
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14039824706%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648445430&t=552e35f38b7c82a3937a65e6c911aa73',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202010%2F09%2F20201009125825_1ef30.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648445430&t=22dfdb58a99b3a11478894dd6601850d',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F16%2F20190216131819_joemv.thumb.700_0.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648445430&t=22eaca413aebd1e48a89af8dbcf31a5f',
]

const AvatarButton: FC = () => {
  const { update } = useContext(SetAvatarContext)

  const changeAvatar = () => {
    update({
      avatar: avatarList[0],
    })
    avatarList.push(avatarList.shift() as string)
  }

  return (
    <Button className="ml-4" onClick={changeAvatar}>
      change Avatar
    </Button>
  )
}

const ReactContextApp: FC = () => {
  const [avatarInfo, actions] = useAvatarContext()

  return (
    <div>
      <UserContext.Provider value={avatarInfo}>

        <SetAvatarContext.Provider value={actions}>
          <UserApp />
          <AvatarButton />
        </SetAvatarContext.Provider>
      </UserContext.Provider>
    </div>
  )
}

export default ReactContextApp
