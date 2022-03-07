import StorageDriver from '@/helpers/StorageDriver'
import CRUD from '@/helpers/todo/CRUD'
import Filter from '@/helpers/todo/Filter'

export interface Todo {
  id: string
  isComplete: boolean
  todo: string
  createdAt: number
}

const storage = new StorageDriver('localStorage')

const todo = {
  crud: new CRUD(storage, 'todo-app'),
  filter: new Filter(storage, 'todo-app-filter'),
}

export default todo
