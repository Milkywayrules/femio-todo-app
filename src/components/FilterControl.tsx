import ButtonFilter from '@/components/atoms/ButtonFilter'
import { FilterOnState } from '@/libs/todo/Filter'

interface PropsFilterControl extends FilterOnState {
  hideOn?: 'mobile' | 'desktop'
  className?: string
}

const FilterControl = ({ filterOn, setFilterOn, hideOn, className = '' }: PropsFilterControl) => {
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
      <ButtonFilter filterOnType="all" filterState={[filterOn, setFilterOn]}>
        All
      </ButtonFilter>
      <ButtonFilter filterOnType="active" filterState={[filterOn, setFilterOn]}>
        Active
      </ButtonFilter>
      <ButtonFilter filterOnType="completed" filterState={[filterOn, setFilterOn]}>
        Completed
      </ButtonFilter>
    </div>
  )
}

export default FilterControl
