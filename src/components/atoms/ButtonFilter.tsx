import { FilterOnState } from '@/components/FilterControl'
import todo from '@/helpers/todo'
import { Dispatch, FC, SetStateAction } from 'react'

interface PropsButtonFilter {
  filterState: [FilterOnState['filterOn'], Dispatch<SetStateAction<FilterOnState['filterOn']>>]
  filterType: FilterOnState['filterOn']
}

const ButtonFilter: FC<PropsButtonFilter> = ({
  filterState: [filterOn, setFilterOn],
  filterType,
  children,
}) => {
  const filterOnClassName1 = 'text-blue-bright'
  const filterOnClassName2 =
    'hover:text-gray-l-500 active:text-gray-l-500/50 dark:hover:text-gray-d-200 dark:active:text-gray-d-200/50 dark'

  return (
    <button
      onClick={() => setFilterOn(todo.filter.set(filterType).get())}
      className={`rounded border-[1px] border-transparent px-1 font-bold outline-none focus-visible:border-blue-bright ${
        filterOn === filterType ? filterOnClassName1 : filterOnClassName2
      }`}
    >
      {children}
    </button>
  )
}

export default ButtonFilter
