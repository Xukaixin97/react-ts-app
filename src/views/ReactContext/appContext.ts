import { createContext, useState } from 'react';

export interface IAvatarContextValue {
  avatar: string;
}

const defaultValue: IAvatarContextValue = {
  avatar:
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F16%2F20190216131819_joemv.thumb.700_0.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648445430&t=22eaca413aebd1e48a89af8dbcf31a5f',
};

const UserContext = createContext<IAvatarContextValue>(defaultValue);

export const useAvatarContext = () => {
  const [avatarInfo, setAvatarInfo] = useState<IAvatarContextValue>(defaultValue);
  return [avatarInfo, { update: setAvatarInfo }] as const;
};

export const SetAvatarContext = createContext<{ update(data: IAvatarContextValue): void }>({ update() {} });

export default UserContext;
