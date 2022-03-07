import localStorageDriver from '@/helpers/localStorageDriver'
import Theme from '@/libs/Theme'

const theme = new Theme(localStorageDriver, 'todo-app-theme')

export default theme
