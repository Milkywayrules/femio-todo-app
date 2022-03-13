import ButtonToggle from '@/components/atoms/ButtonToggle'
import HeaderBannerImage from '@/components/atoms/HeaderBannerImage'
import MoonIcon from '@/components/atoms/MoonIcon'
import SiteTitle from '@/components/atoms/SiteTitle'
import SunIcon from '@/components/atoms/SunIcon'
import InputTodo from '@/components/molecules/InputTodo'
import TodoItem from '@/components/molecules/TodoItem'
import TodoContainer from '@/components/TodoContainer'
import theme from '@/helpers/theme'
import todo from '@/helpers/todo'
import { FilterOnType } from '@/libs/todo/Filter'
import store from '@/store'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

const FILTER_DEFAULT = todo.filter.get()

const App = () => {
  const [filterOn, setFilterOn] = useState<FilterOnType>(FILTER_DEFAULT)
  const [todos, setTodos] = useAtom(store.todo.todoAtom)
  const [isDarkMode, setIsDarkMode] = useAtom(store.theme.darkModeAtom)

  // refilter when filter changes
  useEffect(() => {
    setTodos(todo.crud.filter(filterOn))
  }, [filterOn])

  const handleToggleDarkMode = () => {
    theme.toggleDarkMode()
    setIsDarkMode(theme.getIsDarkMode())
  }

  return (
    <div className="min-h-screen w-screen bg-gray-l-100 font-main text-gray-l-500 dark:bg-blue-dark-desaturated dark:text-white">
      <HeaderBannerImage />

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
            {todoProps => <TodoItem {...todoProps} filterOn={filterOn} />}
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
