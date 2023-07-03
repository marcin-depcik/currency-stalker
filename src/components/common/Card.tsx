import '@/styles/components/Card.scss'

import { PropsWithChildren } from 'react'

interface PropsType {
  className?: string
}

export const Card = ({
  children,
  className = '',
}: PropsWithChildren<PropsType>) => {
  return <div className={`base-card ${className}`}>{children}</div>
}
