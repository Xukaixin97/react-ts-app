import { Get } from '@/utils';
import { IUser } from './types';

export const fetchUserList = () => {
  return Get<IUser[]>(`http://localhost:3001/people`);
};
