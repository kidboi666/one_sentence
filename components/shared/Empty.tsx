import { PropsWithChildren } from 'react'
import Text from './Text'
import cn from '@/lib/cn'

interface Props {
  className?: string
}

export default function Empty({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center rounded-md bg-white py-12 opacity-65 dark:bg-var-darkgray',
        className,
      )}
    >
      {children}
    </div>
  )
}

Empty.Text = ({ children }: PropsWithChildren) => (
  <Text type="caption">{children}</Text>
)
