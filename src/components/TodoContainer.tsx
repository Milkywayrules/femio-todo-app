import FilterControl from '@/components/FilterControl'
import TodoListContainer from '@/components/TodoListContainer'
import TodoListContainerDraggable from '@/components/TodoListContainerDraggable'
import todo from '@/helpers/todo'
import store from '@/store'
import { useAtom } from 'jotai'

interface Props {
  // children: (todo: Todo, index: number) => JSX.Element
  contentDraggable: boolean
}

const TodoContainer = ({ contentDraggable }: Props) => {
  const [filterOn, setFilterOn] = useAtom(store.todo.filterOnAtom)
  const [todos, setTodos] = useAtom(store.todo.todoAtom)

  const handleDeleteCompleted = () => {
    todo.crud.deleteCompleted()
    setTodos(todo.crud.filter(filterOn))
  }

  return (
    <>
      <div className="divide-y divide-gray-l-300 overflow-hidden rounded shadow-lg dark:divide-gray-d-300">
        {contentDraggable ? (
          <TodoListContainerDraggable />
        ) : (
          <>
            <TodoListContainer />
          </>
        )}

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
    </>
  )
}

export default TodoContainer
