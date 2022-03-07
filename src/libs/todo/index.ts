import CRUD from '@/libs/todo/CRUD'
import Filter from '@/libs/todo/Filter'

export interface Todo {
  id: string
  isComplete: boolean
  todo: string
  createdAt: number
}

const TodoLib = {
  CRUD,
  Filter,
}

export default TodoLib
