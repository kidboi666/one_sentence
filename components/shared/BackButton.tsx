'use client'

import { useRouter } from 'next/navigation'
import Button from './Button'
import cn from '@/lib/cn'

interface Props {
  className?: string
}

export default function BackButton({ className }: Props) {
  const router = useRouter()
  const handleButtonClick = () => {
    router.back()
  }
  return (
    <div className="w-full md:max-w-[768px]">
      <Button
        variant="secondary"
        onClick={handleButtonClick}
        className={cn('w-10 self-end border-0', className)}
      >
        {'<'}
      </Button>
    </div>
  )
}
