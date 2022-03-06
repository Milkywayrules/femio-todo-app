import { Storage } from '@/helpers/Storage'
import CRUD from '@/helpers/todo/CRUD'
import Filter from '@/helpers/todo/Filter'

export interface Todo {
  id: string
  isComplete: boolean
  todo: string
  createdAt: number
}

const storage = new Storage('localStorage')

const todo = {
  crud: new CRUD(storage, 'todo-app'),
  filter: new Filter(storage, 'todo-app-filter'),
}

export default todo
