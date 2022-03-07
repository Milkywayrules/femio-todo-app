import StorageDriver from '@/libs/StorageDriver'
import CRUD from '@/libs/todo/CRUD'
import Filter from '@/libs/todo/Filter'

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
