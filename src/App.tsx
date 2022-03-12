import Icons from '@/assets/icons'
import checkIcon from '@/assets/icons/icon-check.svg'
import ButtonToggle from '@/components/atoms/ButtonToggle'
import HeaderBannerImage from '@/components/atoms/HeaderBannerImage'
import MoonIcon from '@/components/atoms/MoonIcon'
import SiteTitle from '@/components/atoms/SiteTitle'
import SunIcon from '@/components/atoms/SunIcon'
import { FilterOnState } from '@/components/FilterControl'
import TodoContainer from '@/components/TodoContainer'
import theme from '@/helpers/theme'
import todo from '@/helpers/todo'
import { Todo } from '@/libs/todo'
import { FormEvent, Fragment, useEffect, useState } from 'react'

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
    <div className="min-h-screen w-screen bg-gray-l-100 font-main text-sm text-gray-l-500 dark:bg-blue-dark-desaturated dark:text-white desktop:text-lg">
      <HeaderBannerImage isDarkMode={isDarkMode} />

      {/* content */}
      <div className="relative mx-auto flex max-w-[39rem] flex-col gap-7 px-6 py-11 desktop:py-20">
        {/* header */}
        <header className="flex items-center justify-between">
          <SiteTitle text="TODO" />
          <ButtonToggle
            isOn={isDarkMode}
            iconOn={<SunIcon />}
            iconOff={<MoonIcon />}
            handleToggle={handleToggleDarkMode}
          />
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

          <TodoContainer todosState={[todos, setTodos]} filterState={[filterOn, setFilterOn]}>
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
                        {isComplete && <img src={checkIcon} alt="check icon" className="h-2 w-2" />}
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
