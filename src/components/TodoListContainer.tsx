import TodoItem from '@/components/molecules/TodoItem'
import store from '@/store'
import { useAtomValue } from 'jotai'

const TodoListContainer = () => {
  const todos = useAtomValue(store.todo.todoAtom)
  const filterOn = useAtomValue(store.todo.filterOnAtom)

  return (
    <>
      {todos.map(todo => (
        <TodoItem {...todo} filterOn={filterOn} />
      ))}
    </>
  )
}
export default TodoListContainer
