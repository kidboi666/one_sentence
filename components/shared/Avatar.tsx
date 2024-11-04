import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import Image from 'next/image'
import profileImage from '@/public/profile.svg'
import { ringTheme, useTheme } from '@/store/useTheme'

interface Props {
  src?: string | null
  size?: 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  ring?: boolean
  className?: string
  onClick?: () => void
}

const avatarVariants = cva(
  'relative flex-shrink-0 overflow-hidden rounded-full bg-zinc-400 transition duration-300 ease-in-out hover:ring-4 group-hover:ring-4 dark:bg-var-darkgray',
  {
    variants: {
      size: {
        xs: 'size-8',
        sm: 'size-9',
        base: 'size-12',
        md: 'size-20',
        lg: 'size-40',
        xl: 'size-52',
      },
      shadow: {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
      },
    },
  },
)

export default function Avatar({
  src,
  size = 'md',
  ring = false,
  shadow = 'none',
  onClick,
  className,
}: Props) {
  const { color } = useTheme()
  return (
    <div
      onClick={onClick}
      className={cn(
        avatarVariants({ size, shadow }),
        ringTheme({ color }),
        ring && 'border border-zinc-400 dark:border-zinc-200',
        className,
      )}
    >
      {src ? (
        <Image src={src} fill className="object-cover" alt="프로필 이미지" />
      ) : (
        <Image
          src={profileImage}
          fill
          alt="프로필 이미지 없음"
          className="object-cover"
        />
      )}
    </div>
  )
}
