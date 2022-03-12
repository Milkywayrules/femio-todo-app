import checkIcon from '@/assets/icons/icon-check.svg'
import crossIcon from '@/assets/icons/icon-cross.svg'
import moonIcon from '@/assets/icons/icon-moon.svg'
import sunIcon from '@/assets/icons/icon-sun.svg'
import lightHeaderBG from '@/assets/images/bg-mobile-light.jpg'
import darkHeaderBG from '@/assets/images/bg-mobile-dark.jpg'
import FilterControl, { FilterOnState } from '@/components/FilterControl'
import TodoContainer from '@/components/TodoContainer'
import theme from '@/helpers/theme'
import todo from '@/helpers/todo'
import { Todo } from '@/libs/todo'
import { FormEvent, Fragment, useEffect, useState } from 'react'
import Icons from '@/assets/icons'

const TODOS_DEFAULT = todo.crud.getAll()
const FILTER_DEFAULT = todo.filter.get()

const App = () => {
  const [filterOn, setFilterOn] = useState<FilterOnState['filterOn']>(FILTER_DEFAULT)
  const [todos, setTodos] = useState<Todo[]>(TODOS_DEFAULT)
  const [newTodo, setNewTodo] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(theme.getIsDarkMode())

  // refilter when filter changes
  useEffect(() => {
    setTodos(todo.crud.filter(filterOn))
  }, [filterOn])

  const handleTodoAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newTodo) return

    todo.crud.add({ todo: newTodo })
    setTodos(todo.crud.getAll())
    setNewTodo('')
  }

  const handleTodoComplete = (id: Todo['id']) => {
    todo.crud.toggleComplete(id)
    setTodos(todo.crud.filter(filterOn))
  }

  const handleTodoDelete = (id: Todo['id']) => {
    todo.crud.delete(id)
    setTodos(todo.crud.filter(filterOn))
  }

  const handleToggleDarkMode = () => {
    theme.toggleDarkMode()
    setIsDarkMode(theme.getIsDarkMode())
  }

  return (
    <div className="min-h-screen w-screen bg-gray-l-100 font-main text-gray-l-500 dark:bg-blue-dark-desaturated dark:text-white">
      {/* bg banner image */}
      <div className="absolute">
        {isDarkMode ? (
          <img src={darkHeaderBG} alt="Light Header Banner Image" className="" />
        ) : (
          <img src={lightHeaderBG} alt="Light Header Banner Image" className="" />
        )}
      </div>

      {/* content */}
      <div className="relative flex flex-col gap-7 px-6 py-11">
        {/* header */}
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-title text-gray-l-100">TODO</h1>
          <button onClick={handleToggleDarkMode}>
            {isDarkMode ? (
              <img src={sunIcon} alt="Sun Icon" className="h-5 w-5" />
            ) : (
              <img src={moonIcon} alt="Moon Icon" className="h-5 w-5" />
            )}
          </button>
        </header>

        {/* body */}
        <main className="flex flex-col gap-5">
          {/* input form */}
          <label
            className="flex w-full items-center justify-between gap-3 overflow-hidden rounded bg-white py-3.5 px-4 text-sm dark:bg-gray-d-400"
            htmlFor="add-todo"
          >
            <div className="h-5 w-5 shrink-0 rounded-full border border-gray-l-300 dark:border-gray-d-300"></div>

            <form className="h-full w-full" onSubmit={handleTodoAdd}>
              <input
                className="h-full w-full outline-none dark:bg-gray-d-400 dark:text-white"
                type="text"
                name="addTodo"
                id="add-todo"
                placeholder="Create a new todo..."
                value={newTodo}
                onChange={e => setNewTodo(e.currentTarget.value)}
                minLength={3}
              />
            </form>
          </label>

          <div className="divide-y divide-gray-l-300 overflow-hidden rounded shadow-lg dark:divide-gray-d-300">
            <TodoContainer todos={todos} setTodos={setTodos} filterOn={filterOn}>
              {({ id, isComplete, todo }) => {
                let className = ''
                let classNameP = 'text-gray-l-500 dark:text-gray-d-100'

                if (isComplete) {
                  className = 'bg-gradient-to-br from-check-1 to-check-2'
                  classNameP = 'line-through text-gray-l-300 dark:text-gray-d-300'
                }

                return (
                  <Fragment key={id}>
                    <div className="flex w-full items-center justify-between gap-3 overflow-hidden bg-white py-3.5 px-4 text-sm dark:bg-gray-d-400">
                      <div
                        className="flex w-full items-center gap-3"
                        onClick={() => handleTodoComplete(id)}
                      >
                        <div
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-l-300 dark:border-gray-d-300 ${className}`}
                        >
                          {isComplete && (
                            <img src={checkIcon} alt="check icon" className="h-2 w-2" />
                          )}
                        </div>
                        <p className={`h-full w-full ${classNameP}`}>{todo}</p>
                      </div>

                      <button className="shrink-0" onClick={() => handleTodoDelete(id)}>
                        <Icons.cross className="h-5 w-5 fill-gray-d-300" />
                      </button>
                    </div>
                  </Fragment>
                )
              }}
            </TodoContainer>
          </div>

          <FilterControl filterOn={filterOn} setFilterOn={setFilterOn} />
        </main>

        {/* footer */}
        <footer className="mx-auto py-5 text-gray-l-400">
          <p>Drag and drop to reorder list</p>
        </footer>
      </div>
    </div>
  )
}

export default App
