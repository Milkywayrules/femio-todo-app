import todo from '@/helpers/todo'
import { Dispatch, SetStateAction } from 'react'

export interface FilterOnState {
  filterOn: 'all' | 'active' | 'completed'
  setFilterOn: Dispatch<SetStateAction<FilterOnState['filterOn']>>
  hideOn?: 'mobile' | 'desktop'
  className?: string
}

const FilterControl = ({ filterOn, setFilterOn, hideOn, className = '' }: FilterOnState) => {
  const handleFilterSelect = (filterOn: FilterOnState['filterOn']) => {
    setFilterOn(todo.filter.set(filterOn).get())
  }

  const hideOnClassName =
    hideOn === 'desktop'
      ? 'flex desktop:hidden'
      : hideOn === 'mobile'
      ? 'hidden desktop:flex'
      : 'flex'

  return (
    <div
      className={`w-full items-center justify-center gap-5 overflow-hidden rounded bg-white text-sm text-gray-l-400 dark:bg-gray-d-400 ${className} ${hideOnClassName}`}
    >
      <button
        onClick={() => handleFilterSelect('all')}
        className={`font-bold ${filterOn === 'all' ? 'text-blue-bright' : ''}`}
      >
        All
      </button>
      <button
        onClick={() => handleFilterSelect('active')}
        className={`font-bold ${filterOn === 'active' ? 'text-blue-bright' : ''}`}
      >
        Active
      </button>
      <button
        onClick={() => handleFilterSelect('completed')}
        className={`font-bold ${filterOn === 'completed' ? 'text-blue-bright' : ''}`}
      >
        Completed
      </button>
    </div>
  )
}

export default FilterControl
