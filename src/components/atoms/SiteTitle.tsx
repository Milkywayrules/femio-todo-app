interface Props {
  text: string
}

const SiteTitle = ({ text }: Props) => {
  return (
    <h1 className="text-3xl font-bold tracking-title text-gray-l-100 desktop:text-5xl">
      <a href="/">{text}</a>
    </h1>
  )
}

export default SiteTitle
