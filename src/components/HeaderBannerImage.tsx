interface Props {
  isDarkMode: boolean
}

const HeaderBannerImage = ({ isDarkMode }: Props) => {
  return (
    <>
      <div className="absolute h-20 w-screen">
        {isDarkMode ? (
          <div
            className={
              'h-[12.5rem] bg-mobile-darkHeader bg-cover desktop:h-64 desktop:bg-desktop-darkHeader'
            }
          />
        ) : (
          <div
            className={
              'h-[12.5rem] bg-mobile-lightHeader bg-cover desktop:h-64 desktop:bg-desktop-lightHeader'
            }
          />
        )}
      </div>
    </>
  )
}

export default HeaderBannerImage
