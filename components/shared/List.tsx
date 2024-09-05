import cn from '@/lib/cn'
import { ComponentProps, PropsWithChildren, RefObject } from 'react'

interface Props extends ComponentProps<'ul'> {
  className?: string
  targetRef?: RefObject<HTMLUListElement>
  dataStatus?: string
}

export const List = ({
  children,
  className,
  targetRef,
  dataStatus,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <ul
      ref={targetRef}
      data-status={dataStatus}
      onTransitionEnd={() => {
        if (targetRef?.current?.getAttribute('data-status') === 'closed') {
          targetRef.current.classList.add('hidden')
        }
      }}
      className={cn('dark:bg-var-dark list-none bg-white', className)}
      {...props}
    >
      {children}
    </ul>
  )
}

interface RowProps extends ComponentProps<'li'> {
  className?: string
  targetRef?: RefObject<HTMLLIElement>
}

List.Row = ({
  children,
  className,
  targetRef,
  ...props
}: PropsWithChildren<RowProps>) => {
  return (
    <li ref={targetRef} className={cn(className)} {...props}>
      {children}
    </li>
  )
}
