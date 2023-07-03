import { PropsWithChildren } from 'react'
import { Card } from '@/components/common/Card'
import { useSelector } from 'react-redux'
import { currencyState } from '@/redux/features/currencySlice'

interface PropsType {
  className?: string
}

export const LoadingContent = ({
  children,
  className = '',
}: PropsWithChildren<PropsType>) => {
  const { loading } = useSelector(currencyState)
  return loading ? (
    <Card className={className}>
      <h3>Loading...</h3>
    </Card>
  ) : (
    <>{children}</>
  )
}
