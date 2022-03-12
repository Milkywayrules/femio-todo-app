import StorageDriver from '@/libs/StorageDriver'
import { Todo } from '@/libs/todo'
import { FilterOnType } from '@/libs/todo/Filter'

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
  private _storage
  private _storageKey

  private _todos: Todo[] = []

  constructor(todoStorage: StorageDriver, storageKey: string) {
    this._storage = todoStorage.getStorage()
    this._storageKey = storageKey

    this._persistNewTodos(this.getAll())
  }

  private _persistNewTodosToStorage(todos: Todo[]) {
    this._storage.setItem(this._storageKey, JSON.stringify(todos))
  }

  private _persistNewTodos(todos: Todo[] | Todo) {
    if (Array.isArray(todos)) {
      this._todos = todos
    } else {
      this._todos.push(todos)
    }

    this._persistNewTodosToStorage(this._todos)
  }

  public add({ todo, isComplete = false }: TodoAdd) {
    const id = `${Date.now() + (Math.random() * 10).toFixed()}`
    const createdAt = Date.now()
    const newTodo: Todo = { id, isComplete, todo, createdAt }

    this._persistNewTodos(newTodo)
    return id
  }

  public getAll(): Todo[] | [] {
    const data = this._storage.getItem(this._storageKey) || '[]'
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

    this._persistNewTodos(newTodos)
    return this._todos
  }

  public delete(id: Todo['id']) {
    const todos = this.getAll()
    const newTodos = todos.filter(todo => todo.id !== id)

    this._persistNewTodos(newTodos)
    return this._todos
  }

  public deleteCompleted() {
    const todos = this.getAll()
    const newTodos = todos.filter(todo => !todo.isComplete)

    this._persistNewTodos(newTodos)
    return this._todos
  }

  public deleteAll() {
    this._persistNewTodos([])
    return this._todos
  }

  public filter(filter: FilterOnType) {
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
