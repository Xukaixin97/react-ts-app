import type { IUser } from './types'
import { Get } from '@/utils'

export const fetchUserList = () => {
  return Get<IUser[]>('http://localhost:3001/people')
}
