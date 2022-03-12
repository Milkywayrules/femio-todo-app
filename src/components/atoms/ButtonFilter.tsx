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
    'hover:text-gray-l-500 focus-visible:text-gray-l-500 dark:hover:text-gray-d-200 dark:focus-visible:text-gray-d-200'

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
