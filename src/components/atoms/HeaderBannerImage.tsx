import store from '@/store'
import { useAtomValue } from 'jotai'

const HeaderBannerImage = () => {
  const isDarkMode = useAtomValue(store.theme.darkModeAtom)

  return (
    <>
      <div className="absolute h-20 w-screen">
        {isDarkMode ? (
          <div
            className={
              'h-[12.5rem] bg-mobile-darkHeader bg-cover desktop:h-72 desktop:bg-desktop-darkHeader'
            }
          />
        ) : (
          <div
            className={
              'h-[12.5rem] bg-mobile-lightHeader bg-cover desktop:h-72 desktop:bg-desktop-lightHeader'
            }
          />
        )}
      </div>
    </>
  )
}

export default HeaderBannerImage
