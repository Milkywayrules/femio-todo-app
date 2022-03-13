import TodoItem, { PropsTodoItem } from '@/components/molecules/TodoItem'
import { CSSProperties, forwardRef } from 'react'
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps
} from 'react-beautiful-dnd'

interface Props extends Omit<PropsTodoItem, 'parentProps'> {
  draggableProps: DraggableProvidedDraggableProps
  dragHandleProps?: DraggableProvidedDragHandleProps
  style?: CSSProperties
}

const TodoItemDraggable = forwardRef<HTMLDivElement, Props>(
  ({ draggableProps, dragHandleProps, style, ...rest }, ref) => {
    return (
      <TodoItem
        {...rest}
        parentProps={{ ...draggableProps, ...dragHandleProps, style }}
        ref={ref}
      />
    )
  },
)

export default TodoItemDraggable
