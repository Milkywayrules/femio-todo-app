import todo, { Todo } from '@/helpers/todo'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  setTodos: Dispatch<SetStateAction<Todo[]>>
  todos: Todo[]
  children: (todo: Todo) => JSX.Element
}

const TodoCards = ({ todos, setTodos, children }: Props) => {
  const handleDeleteCompleted = () => {
    setTodos(todo.crud.deleteCompleted())
  }

  return (
    <>
      {todos.map(todo => children(todo))}

      <div className="flex w-full items-center justify-between gap-3 overflow-hidden bg-white py-4 px-4 text-xs text-gray-l-400">
        <p>{todos.length} items left</p>
        <button onClick={handleDeleteCompleted}>Clear Completed</button>
      </div>
    </>
  )
}

export default TodoCards
