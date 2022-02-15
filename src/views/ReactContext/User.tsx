import { Avatar } from 'antd';
import { useContext, type FC } from 'react';
import UserContext from './appContext';

const UserApp: FC = () => {
  const { avatar } = useContext(UserContext);

  return <Avatar size={64} src={avatar} />;
};
export default UserApp;
