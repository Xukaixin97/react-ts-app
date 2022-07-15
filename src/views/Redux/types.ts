export interface ITodo {
  id: string
  text: string
  completed: boolean
}

export enum visibleTypes {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}
