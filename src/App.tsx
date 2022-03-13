import ButtonToggle from '@/components/atoms/ButtonToggle'
import HeaderBannerImage from '@/components/atoms/HeaderBannerImage'
import IconCollectionOutline from '@/components/atoms/IconCollectionOutline'
import IconCollectionSolid from '@/components/atoms/IconCollectionSolid'
import MoonIcon from '@/components/atoms/MoonIcon'
import SiteTitle from '@/components/atoms/SiteTitle'
import SunIcon from '@/components/atoms/SunIcon'
import FilterControl from '@/components/FilterControl'
import InputTodo from '@/components/molecules/InputTodo'
import TodoContainer from '@/components/TodoContainer'
import theme from '@/helpers/theme'
import todo from '@/helpers/todo'
import store from '@/store'
import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { useEffect, useState } from 'react'

const App = () => {
  const [filterOn, setFilterOn] = useAtom(store.todo.filterOnAtom)
  const setTodos = useUpdateAtom(store.todo.todoAtom)
  const [isDarkMode, setIsDarkMode] = useAtom(store.theme.darkModeAtom)
  const [isTodoContentDraggable, setIsTodoContentDraggable] = useState(true) // only available locally as a state

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

          <TodoContainer contentDraggable={isTodoContentDraggable} />

          <FilterControl
            filterOn={filterOn}
            setFilterOn={setFilterOn}
            hideOn="desktop"
            className="py-3.5 px-4 shadow-md"
          />
        </main>

        {/* footer */}
        <footer className="mx-auto flex flex-col items-center py-5 text-gray-l-400">
          {isTodoContentDraggable ? <p>Drag and drop to reorder list</p> : <span>&nbsp;</span>}

          <div className="mt-5 flex flex-col items-center gap-1 rounded bg-blue-bright/10 px-5 py-3">
            <ButtonToggle
              isOn={isTodoContentDraggable}
              iconOn={<IconCollectionSolid />}
              iconOff={<IconCollectionOutline />}
              handleToggle={() => setIsTodoContentDraggable(!isTodoContentDraggable)}
              className="text-blue-dark/50 dark:text-white/50"
            />

            <p className="text-blue-dark/75 dark:text-white/75">
              Todo list draggable mode: {isTodoContentDraggable ? 'on' : 'off'}
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
