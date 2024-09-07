import cn from '@/lib/cn'
import Button, { ButtonProps } from '@/components/shared/Button'
import { useTheme } from '@/store/useTheme'

interface Props extends ButtonProps {
  index: number
}

export default function EmotionBlock({ index, onClick }: Props) {
  const { color } = useTheme()
  const colorizeOpacity = (order: number) => {
    if (order === 0) {
      return 'opacity-0'
    } else if (order === 1) {
      return 'opacity-25'
    } else if (order === 2) {
      return 'opacity-50'
    } else if (order === 3) {
      return 'opacity-75'
    } else {
      return 'opacity-100'
    }
  }
  return (
    <Button
      variant="emptyStyle"
      onClick={onClick}
      className={cn(
        'opaicty-0 flex size-full items-center justify-center p-0',
        color === 'blue' && 'bg-var-blue dark:bg-var-blue',
        color === 'yellow' && 'bg-var-yellow dark:bg-var-yellow',
        color === 'green' && 'bg-var-green dark:bg-var-green',
        color === 'orange' && 'bg-var-orange dark:bg-var-orange',
        color === 'black' && 'bg-var-black dark:bg-white dark:text-var-dark',
        colorizeOpacity(index),
      )}
    ></Button>
  )
}
