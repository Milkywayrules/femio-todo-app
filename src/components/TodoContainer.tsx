import FilterControl from '@/components/FilterControl'
import todo from '@/helpers/todo'
import { Todo } from '@/libs/todo'
import { FilterOnType } from '@/libs/todo/Filter'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  todosState: [Todo[], Dispatch<SetStateAction<Todo[]>>]
  filterState: [FilterOnType, Dispatch<SetStateAction<FilterOnType>>]
  children: (todo: Todo) => JSX.Element
}

const TodoContainer = ({
  todosState: [todos, setTodos],
  filterState: [filterOn, setFilterOn],
  children,
}: Props) => {
  const handleDeleteCompleted = () => {
    todo.crud.deleteCompleted()
    setTodos(todo.crud.filter(filterOn))
  }

  return (
    <>
      <div className="divide-y divide-gray-l-300 overflow-hidden rounded shadow-lg dark:divide-gray-d-300">
        {/* todo list items */}
        {todos.map(todo => children(todo))}

        {/* todo list container footer */}
        <div className="flex w-full items-center justify-between gap-3 overflow-hidden bg-white py-4 px-4 text-xs text-gray-l-400 dark:bg-gray-d-400">
          <p className="whitespace-nowrap">{todos.length} items left</p>

          <FilterControl filterOn={filterOn} setFilterOn={setFilterOn} hideOn="mobile" />

          <button
            className="whitespace-nowrap rounded border-[1px] border-transparent px-1 outline-none hover:text-gray-l-500/90 focus-visible:border-blue-bright active:text-gray-l-500/50 dark:hover:text-gray-d-200 dark:active:text-gray-d-200/50"
            onClick={handleDeleteCompleted}
          >
            Clear Completed
          </button>
        </div>
      </div>

      <FilterControl
        filterOn={filterOn}
        setFilterOn={setFilterOn}
        hideOn="desktop"
        className="py-3.5 px-4 shadow-md"
      />
    </>
  )
}

export default TodoContainer
