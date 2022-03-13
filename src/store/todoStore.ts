import todo from '@/helpers/todo'
import { atom } from 'jotai'

const TODOS_DEFAULT = todo.crud.getAll()
const FILTER_DEFAULT = todo.filter.get()

// we can use atomWithStorage,
// but since we handle storage implementation on libs,
// we don't need Jotai's.
const todoAtom = atom(TODOS_DEFAULT)
const filterOnAtom = atom(FILTER_DEFAULT)

const todoStore = {
  todoAtom,
  filterOnAtom,
}

export default todoStore
