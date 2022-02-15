import { Get } from '@/utils';
export interface IUser {
  id: number;
  name: string;
  age: number;
}
export const getUserList = () => {
  return Get<IUser[]>(`http://localhost:3001/people`);
};

export const getUserInfo = (id: number) => {
  return Get<IUser>(`http://localhost:3001/people/${id}`);
};
