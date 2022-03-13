import todo from '@/helpers/todo'
import { atom } from 'jotai'

const TODOS_DEFAULT = todo.crud.getAll()

// we can use atomWithStorage,
// but since we handle storage implementation on libs,
// we don't need Jotai's.
export const todoAtom = atom(TODOS_DEFAULT)
