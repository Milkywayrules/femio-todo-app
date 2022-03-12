import FilterControl, { FilterOnState } from '@/components/FilterControl'
import todo from '@/helpers/todo'
import { Todo } from '@/libs/todo'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  setTodos: Dispatch<SetStateAction<Todo[]>>
  todos: Todo[]
  filterOn: FilterOnState['filterOn']
  setFilterOn: Dispatch<SetStateAction<FilterOnState['filterOn']>>
  children: (todo: Todo) => JSX.Element
}

const TodoContainer = ({ todos, setTodos, filterOn, setFilterOn, children }: Props) => {
  const handleDeleteCompleted = () => {
    todo.crud.deleteCompleted()
    setTodos(todo.crud.filter(filterOn))
  }

  return (
    <>
      <div className="divide-y divide-gray-l-300 overflow-hidden rounded shadow-lg dark:divide-gray-d-300">
        {todos.map(todo => children(todo))}

        <div className="flex w-full items-center justify-between gap-3 overflow-hidden bg-white py-4 px-4 text-xs text-gray-l-400 dark:bg-gray-d-400">
          <p className="whitespace-nowrap">{todos.length} items left</p>

          <FilterControl filterOn={filterOn} setFilterOn={setFilterOn} className='hidden desktop:flex' />

          <button className="whitespace-nowrap" onClick={handleDeleteCompleted}>
            Clear Completed
          </button>
        </div>
      </div>

      <FilterControl
        filterOn={filterOn}
        setFilterOn={setFilterOn}
        className="py-3.5 px-4 shadow-md flex desktop:hidden"
      />
    </>
  )
}

export default TodoContainer
