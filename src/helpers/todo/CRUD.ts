import { FilterOnState } from '@/components/FilterControl'
import { Storage } from '@/helpers/Storage'
import { Todo } from '@/helpers/todo'

type TodoAdd = Required<Pick<Todo, 'todo'>> & Partial<Pick<Todo, 'isComplete'>>

const DUMMY_TODO: Todo[] = [
  {
    id: `${Date.now() + (Math.random() * 100).toFixed()}`,
    todo: 'dummy 1',
    isComplete: false,
    createdAt: Date.now(),
  },
  {
    id: `${Date.now() + (Math.random() * 100).toFixed()}`,
    todo: 'dummy 2',
    isComplete: true,
    createdAt: Date.now(),
  },
  {
    id: `${Date.now() + (Math.random() * 100).toFixed()}`,
    todo: 'dummy 3',
    isComplete: false,
    createdAt: Date.now(),
  },
  {
    id: `${Date.now() + (Math.random() * 100).toFixed()}`,
    todo: 'dummy 4',
    isComplete: false,
    createdAt: Date.now(),
  },
  {
    id: `${Date.now() + (Math.random() * 100).toFixed()}`,
    todo: 'dummy 5',
    isComplete: true,
    createdAt: Date.now(),
  },
  {
    id: `${Date.now() + (Math.random() * 100).toFixed()}`,
    todo: 'dummy 6',
    isComplete: false,
    createdAt: Date.now(),
  },
  {
    id: `${Date.now() + (Math.random() * 100).toFixed()}`,
    todo: 'dummy 7',
    isComplete: false,
    createdAt: Date.now(),
  },
  {
    id: `${Date.now() + (Math.random() * 100).toFixed()}`,
    todo: 'dummy 8',
    isComplete: false,
    createdAt: Date.now(),
  },
]

export default class CRUD {
  private storage
  private storageKey

  private todos: Todo[] = []

  constructor(todoStorage: Storage, storageKey: string) {
    this.storage = todoStorage.getStorage()
    this.storageKey = storageKey

    this.persistNewTodos(this.getAll())
  }

  private persistNewTodosToStorage(todos: Todo[]) {
    this.storage.setItem(this.storageKey, JSON.stringify(todos))
  }

  private persistNewTodos(todos: Todo[] | Todo) {
    if (Array.isArray(todos)) {
      this.todos = todos
    } else {
      this.todos.push(todos)
    }

    this.persistNewTodosToStorage(this.todos)
  }

  public add({ todo, isComplete = false }: TodoAdd) {
    const id = `${Date.now() + (Math.random() * 10).toFixed()}`
    const createdAt = Date.now()
    const newTodo: Todo = { id, isComplete, todo, createdAt }

    this.persistNewTodos(newTodo)
    return id
  }

  public getAll(): Todo[] | [] {
    const data = this.storage.getItem(this.storageKey) || '[]'
    const todos = JSON.parse(data) as Todo[] | []

    return todos
  }

  public get(id: Todo['id']): Todo | undefined {
    const todos = this.getAll()

    return todos.find(todo => todo.id === id)
  }

  public getCount(): number {
    return this.getAll().length
  }

  public toggleComplete(id: Todo['id']) {
    const todos = this.getAll()
    const newTodos = todos.map(todo => ({
      ...todo,
      isComplete: todo.id === id ? !todo.isComplete : todo.isComplete,
    }))

    this.persistNewTodos(newTodos)
    return this.todos
  }

  public delete(id: Todo['id']) {
    const todos = this.getAll()
    const newTodos = todos.filter(todo => todo.id !== id)

    this.persistNewTodos(newTodos)
    return this.todos
  }

  public deleteCompleted() {
    const todos = this.getAll()
    const newTodos = todos.filter(todo => !todo.isComplete)

    this.persistNewTodos(newTodos)
    return this.todos
  }

  public deleteAll() {
    this.persistNewTodos([])
    return this.todos
  }

  public filter(filter: FilterOnState['filterOn']) {
    const todos = this.getAll()

    if (filter === 'all') {
      return todos
    } else if (filter === 'active') {
      return todos.filter(todo => !todo.isComplete)
    } else if (filter === 'completed') {
      return todos.filter(todo => todo.isComplete)
    } else {
      return todos
    }
  }
}
