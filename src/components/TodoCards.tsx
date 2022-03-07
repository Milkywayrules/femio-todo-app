import { FilterOnState } from '@/components/FilterControl'
import todo, { Todo } from '@/libs/todo'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  setTodos: Dispatch<SetStateAction<Todo[]>>
  todos: Todo[]
  filterOn: FilterOnState['filterOn']
  children: (todo: Todo) => JSX.Element
}

const TodoContainer = ({ todos, setTodos, filterOn, children }: Props) => {
  const handleDeleteCompleted = () => {
    todo.crud.deleteCompleted()
    setTodos(todo.crud.filter(filterOn))
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

export default TodoContainer
