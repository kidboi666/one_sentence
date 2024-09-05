'use client'

import { useSentence } from '@/store/useSentence'
import { useTheme } from '@/store/useTheme'
import { IBlockInfo } from '@/types/garden'
import { useRef } from 'react'
import Container from './Container'
import Box from './Box'
import cn from '@/lib/cn'
import Text from './Text'
import { WEEKDAY } from '@/app/(protected)/(modals)/post/sentence/_constants'

interface BlockProps {
  empty?: boolean
  className?: string
  length?: number
  average?: number
  summary?: any
  blockInfo?: IBlockInfo
}

export default function Block({
  length,
  empty,
  average,
  summary,
  blockInfo,
}: BlockProps) {
  const infoRef = useRef<HTMLDivElement>(null)
  const { setSentences } = useSentence()
  const { color } = useTheme()

  const colorizeOpacity = (
    orderBy: typeof length | typeof average,
    cutLine: number[],
  ) => {
    if (orderBy) {
      if (orderBy <= cutLine[0]) {
        return 'opacity-25'
      } else if (orderBy <= cutLine[1]) {
        return 'opacity-50'
      } else if (orderBy <= cutLine[2]) {
        return 'opacity-75'
      } else {
        return 'opacity-100'
      }
    }
  }

  if (empty) {
    return <div className="size-2.5 select-none opacity-0" />
  }

  return (
    <Container className="relative">
      <Box
        onMouseEnter={() =>
          infoRef.current?.setAttribute('data-status', 'opened')
        }
        onMouseLeave={() =>
          infoRef.current?.setAttribute('data-status', 'closed')
        }
        onClick={() => setSentences(summary)}
        className="size-2.5 select-none overflow-hidden rounded-sm ring-1 ring-gray-300 dark:ring-gray-700"
      >
        <Box
          className={cn(
            'size-full text-center text-[7px] opacity-0 hover:opacity-55',
            color === 'blue' && 'bg-var-blue ring-var-blue dark:bg-var-blue',
            color === 'yellow' &&
              'bg-var-yellow ring-var-yellow dark:bg-var-yellow',
            color === 'green' &&
              'bg-var-green ring-var-green dark:bg-var-green',
            color === 'orange' &&
              'bg-var-orange ring-var-orange dark:bg-var-orange',
            color === 'black' &&
              'bg-var-black dark:text-var-dark ring-var-black dark:bg-white dark:ring-white',
            length && `${colorizeOpacity(length, [1, 2, 3])}`,
            average && `${colorizeOpacity(average, [25, 50, 75])}`,
          )}
        />
      </Box>
      {blockInfo && (
        <div
          ref={infoRef}
          data-status="closed"
          className={cn(
            'absolute z-30 flex w-fit items-center justify-center text-nowrap rounded-md bg-white p-1 shadow-lg transition data-[status=closed]:scale-0',
            blockInfo.month! > 10
              ? 'right-full origin-top-right'
              : 'left-full origin-top-left',
            blockInfo.weekDay >= 5 ? 'bottom-0' : 'top-0',
          )}
        >
          <Text
            type="caption"
            size="sm"
            className="select-none"
          >{`${blockInfo.month} / ${blockInfo.date} / ${WEEKDAY[blockInfo.weekDay]}`}</Text>
        </div>
      )}
    </Container>
  )
}