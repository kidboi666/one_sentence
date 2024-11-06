import Icon from '@/components/shared/Icon'
import { MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/shared/Button'
import { Container } from '@/components/shared/Container'
import ToolTip from '@/components/shared/Tooltip'
import useToggle from '@/hooks/useToggle'
import cn from '@/lib/cn'

interface Props {
  meId?: string | null
  sentenceId?: number
  viewToolTip?: boolean
}

export default function ReportButton({ meId, viewToolTip, sentenceId }: Props) {
  const router = useRouter()
  const { isOpen: isHover, open: hover, close: leave } = useToggle()

  const pushReportModal = (e: MouseEvent) => {
    e.stopPropagation()
    router.push(`/report_sentence/${sentenceId}?reporter_id=${meId}`)
  }

  return (
    <Container onMouseEnter={hover} onMouseLeave={leave} className="relative">
      <Button
        variant="icon"
        size="icon"
        onClick={pushReportModal}
        className={cn(
          'flex gap-2 border-none text-xs font-light transition hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/25 dark:hover:text-red-600',
        )}
      >
        <Icon view="0 -960 960 960" size={18}>
          <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm34-80h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
        </Icon>
      </Button>
      {viewToolTip && (
        <ToolTip isHover={isHover} position="bottomRight" text="신고하기" />
      )}
    </Container>
  )
}
