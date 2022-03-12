interface Props {
  isOn: boolean
  iconOn: JSX.Element
  iconOff: JSX.Element
  handleToggle: () => void
}

const ButtonToggle = ({ isOn, iconOn, iconOff, handleToggle }: Props) => {
  return <button onClick={handleToggle}>{isOn ? iconOn : iconOff}</button>
}

export default ButtonToggle
