import Icons from '@/assets/icons'
import checkIcon from '@/assets/icons/icon-check.svg'
import ButtonToggle from '@/components/atoms/ButtonToggle'
import HeaderBannerImage from '@/components/atoms/HeaderBannerImage'
import MoonIcon from '@/components/atoms/MoonIcon'
import SiteTitle from '@/components/atoms/SiteTitle'
import SunIcon from '@/components/atoms/SunIcon'
import InputTodo from '@/components/molecules/InputTodo'
import TodoContainer from '@/components/TodoContainer'
import theme from '@/helpers/theme'
import todo from '@/helpers/todo'
import { Todo } from '@/libs/todo'
import { FilterOnType } from '@/libs/todo/Filter'
import store from '@/store'
import { useAtom } from 'jotai'
import { Fragment, useEffect, useState } from 'react'

const FILTER_DEFAULT = todo.filter.get()

const App = () => {
  const [filterOn, setFilterOn] = useState<FilterOnType>(FILTER_DEFAULT)
  const [todos, setTodos] = useAtom(store.todoAtom)
  const [isDarkMode, setIsDarkMode] = useState(theme.getIsDarkMode())

  // refilter when filter changes
  useEffect(() => {
    setTodos(todo.crud.filter(filterOn))
  }, [filterOn])

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
      <HeaderBannerImage isDarkMode={isDarkMode} />

      {/* content */}
      <div className="relative mx-auto flex max-w-[40rem] flex-col gap-7 px-6 py-11 desktop:gap-10 desktop:py-20">
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
          <InputTodo />

          <TodoContainer todosState={[todos, setTodos]} filterState={[filterOn, setFilterOn]}>
            {({ id, isComplete, todo }) => {
              return (
                <Fragment key={id}>
                  <div className="flex w-full items-center justify-between gap-3 overflow-hidden bg-white py-3.5 px-4 text-sm dark:bg-gray-d-400">
                    <div
                      className={`flex w-full items-center gap-3 hover:cursor-pointer focus-visible:bg-blue-bright ${
                        isComplete
                          ? 'text-gray-l-300 dark:text-gray-d-300'
                          : 'text-gray-l-500 dark:text-gray-d-100'
                      }`}
                      onClick={() => handleTodoComplete(id)}
                    >
                      {/* bullet outer */}
                      <button
                        className={`group flex h-5 w-5 shrink-0 rounded-full bg-gray-l-300 p-[1px] outline-none hover:bg-gradient-to-br hover:from-check-1 hover:to-check-2 focus-visible:bg-gradient-to-br focus-visible:from-check-1 focus-visible:to-check-2 dark:bg-gray-d-300 ${
                          isComplete ? 'bg-gradient-to-br from-check-1 to-check-2' : ''
                        }`}
                      >
                        {/* bullet inner */}
                        <div
                          className={`flex h-full w-full shrink-0 items-center justify-center rounded-full ${
                            isComplete
                              ? 'group-focus-visible:bg-transparent'
                              : 'bg-white dark:bg-gray-d-400'
                          }`}
                        >
                          {isComplete && (
                            <img src={checkIcon} alt="check icon" className="h-2 w-2" />
                          )}
                        </div>
                      </button>
                      <p
                        className={`h-full w-full text-left text-lg ${
                          isComplete ? 'line-through' : ''
                        }`}
                      >
                        {todo}
                      </p>
                    </div>

                    <button
                      className="shrink-0 rounded border-[1px] border-transparent outline-none hover:bg-gray-l-200 focus-visible:border-blue-bright active:bg-gray-l-200/50 dark:hover:bg-gray-d-500/50 dark:active:bg-gray-d-500"
                      onClick={() => handleTodoDelete(id)}
                    >
                      <Icons.cross className="h-5 w-5 fill-gray-d-300/50 dark:fill-gray-d-300" />
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
