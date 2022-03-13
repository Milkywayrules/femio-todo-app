import theme from '@/helpers/theme'
import { atom } from 'jotai'

const isDarkMode = theme.getIsDarkMode()

// we can use atomWithStorage,
// but since we handle storage implementation on libs,
// we don't need Jotai's.
export const darkModeAtom = atom(isDarkMode)

const themeStore = {
  darkModeAtom,
}

export default themeStore
