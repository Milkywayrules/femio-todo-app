import moonIcon from '@/assets/icons/icon-moon.svg'
import sunIcon from '@/assets/icons/icon-sun.svg'
import theme from '@/helpers/theme'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  darkModeState: [boolean, Dispatch<SetStateAction<boolean>>]
}

const ButtonDarkMode = ({ darkModeState: [isDarkMode, setIsDarkMode] }: Props) => {
  const handleToggleDarkMode = () => {
    theme.toggleDarkMode()
    setIsDarkMode(theme.getIsDarkMode())
  }

  return (
    <button onClick={handleToggleDarkMode}>
      {isDarkMode ? (
        <img src={sunIcon} alt="Sun Icon" className="h-5 desktop:h-8 w-5 desktop:w-8" />
      ) : (
        <img src={moonIcon} alt="Moon Icon" className="h-5 desktop:h-8 w-5 desktop:w-8" />
      )}
    </button>
  )
}

export default ButtonDarkMode
