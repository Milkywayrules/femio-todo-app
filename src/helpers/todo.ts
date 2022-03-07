import localStorageDriver from '@/helpers/localStorageDriver'
import TodoLib from '@/libs/todo'

const todo = {
  crud: new TodoLib.CRUD(localStorageDriver, 'todo-app'),
  filter: new TodoLib.Filter(localStorageDriver, 'todo-app-filter'),
}

export default todo
