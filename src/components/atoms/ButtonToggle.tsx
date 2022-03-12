interface Props {
  isOn: boolean
  iconOn: JSX.Element
  iconOff: JSX.Element
  handleToggle: () => void
}

const ButtonToggle = ({ isOn, iconOn, iconOff, handleToggle }: Props) => {
  return (
    <button
      className="rounded border-[1px] border-transparent p-1 outline-none focus-visible:border-white"
      onClick={handleToggle}
    >
      {isOn ? iconOn : iconOff}
    </button>
  )
}

export default ButtonToggle
