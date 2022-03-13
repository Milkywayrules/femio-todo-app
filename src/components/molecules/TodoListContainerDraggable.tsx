import TodoItemDraggable from '@/components/molecules/TodoItemDraggable'
import todo from '@/helpers/todo'
import { Todo } from '@/libs/todo'
import store from '@/store'
import { useAtom, useAtomValue } from 'jotai'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'

// a little function to help us with reordering the result
const reorder = (todos: Todo[] | [], startIndex: number, endIndex: number) => {
  const result = Array.from(todos)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const TodoListContainerDraggable = () => {
  const [todos, setTodos] = useAtom(store.todo.todoAtom)
  const filterOn = useAtomValue(store.todo.filterOnAtom)

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) return

    const reorderedTodos = reorder(todos, result.source.index, result.destination.index)

    todo.crud.replaceTodos(reorderedTodos)
    setTodos(reorderedTodos)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`divide-y divide-gray-l-300 dark:divide-gray-d-300 ${
              snapshot.isDraggingOver ? 'bg-gray-l-200 dark:bg-gray-d-500' : 'bg-check-2/25'
            }`}
          >
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {provided => (
                  <TodoItemDraggable
                    {...todo}
                    filterOn={filterOn}
                    ref={provided.innerRef}
                    draggableProps={provided.draggableProps}
                    dragHandleProps={provided.dragHandleProps}
                    style={{ ...provided.draggableProps.style }}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
export default TodoListContainerDraggable
