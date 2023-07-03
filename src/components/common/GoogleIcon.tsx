interface PropsType {
  name: string
  className?: string
  onClick?: () => void | string
}

export const GoogleIcon = ({
  name,
  className = '',
  onClick = () => '',
}: PropsType) => {
  return (
    <span
      onClick={() => onClick()}
      className={`icon material-symbols-rounded ${className}`}
    >
      {name}
    </span>
  )
}
