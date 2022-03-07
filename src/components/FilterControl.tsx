import todo from '@/helpers/todo'
import { Dispatch, SetStateAction } from 'react'

export interface FilterOnState {
  filterOn: 'all' | 'active' | 'completed'
  setFilterOn: Dispatch<SetStateAction<FilterOnState['filterOn']>>
}

const FilterControl = ({ filterOn, setFilterOn }: FilterOnState) => {
  const handleFilterSelect = (filterOn: FilterOnState['filterOn']) => {
    setFilterOn(todo.filter.set(filterOn).get())
  }

  return (
    <div className="flex w-full items-center justify-center gap-5 overflow-hidden rounded bg-white py-3.5 px-4 text-sm text-gray-l-400 shadow-md">
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
