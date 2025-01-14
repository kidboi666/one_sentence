'use client'

import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
import cn from '@/src/lib/cn'
import useToggle from '@/src/hooks/useToggle'
import { ROUTES } from '@/src/routes'
import Button from '@/src/components/Button'
import Icon from '@/src/components/Icon'
import ToolTip from '@/src/components/Tooltip'

interface Props {
  postId?: number
  commentId?: number
  viewToolTip?: boolean
  isSide?: boolean
}

export default function ReportButton({
  viewToolTip,
  postId,
  commentId,
  isSide,
}: Props) {
  const router = useRouter()
  const { isOpen: isHover, open: hover, close: leave } = useToggle()

  const pushReportModal = (e: MouseEvent) => {
    e.stopPropagation()
    if (commentId) {
      router.push(ROUTES.MODAL.REPORT.COMMENT(commentId), { scroll: false })
    } else {
      router.push(ROUTES.MODAL.REPORT.POST(postId!), { scroll: false })
    }
  }

  return (
    <div onMouseEnter={hover} onMouseLeave={leave} className="relative">
      <Button
        variant="icon"
        size={isSide ? 'md' : 'icon'}
        onClick={pushReportModal}
        className={cn(
          'flex gap-2 border-none text-xs font-light transition hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/25 dark:hover:text-red-600',
        )}
      >
        <Icon view="0 -960 960 960" size={isSide ? 24 : 18}>
          <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm34-80h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
        </Icon>
      </Button>
      {viewToolTip && (
        <ToolTip
          isHover={isHover}
          position={isSide ? 'bottomLeft' : 'bottomRight'}
          text="신고하기"
        />
      )}
    </div>
  )
}
