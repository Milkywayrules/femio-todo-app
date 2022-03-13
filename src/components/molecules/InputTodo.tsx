import todo from '@/helpers/todo'
import store from '@/store'
import { useUpdateAtom } from 'jotai/utils'
import { FormEvent, useState } from 'react'

const InputTodo = () => {
  const [newTodo, setNewTodo] = useState('')
  const setTodos = useUpdateAtom(store.todo.todoAtom)

  const handleTodoAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newTodo) return

    todo.crud.add({ todo: newTodo })
    setTodos(todo.crud.getAll())
    setNewTodo('')
  }

  return (
    <label
      className="flex w-full items-center justify-between gap-3 overflow-hidden rounded bg-white py-3.5 px-4 text-sm dark:bg-gray-d-400"
      htmlFor="add-todo"
    >
      <div className="h-5 w-5 shrink-0 rounded-full border border-gray-l-300 dark:border-gray-d-300"></div>

      <form className="h-full w-full desktop:text-lg" onSubmit={handleTodoAdd}>
        <input
          className="h-full w-full outline-none dark:bg-gray-d-400 dark:text-white"
          type="text"
          name="addTodo"
          id="add-todo"
          placeholder="Create a new todo..."
          value={newTodo}
          onChange={e => setNewTodo(e.currentTarget.value)}
          minLength={3}
          maxLength={50}
        />
      </form>
    </label>
  )
}

export default InputTodo
