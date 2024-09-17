'use client'

import cn from '@/lib/cn'
import { EMOTION_STATUS } from '@/app/(protected)/(modals)/post/sentence/_constants'
import Text from '@/components/shared/Text'
import Button from '@/components/shared/Button'
import { List } from '@/components/shared/List'
import RefBox from '@/components/shared/RefBox'

interface Props {
  emotion: (typeof EMOTION_STATUS)[number]
  onChangeEmotion: (emotion: string) => void
  selectedEmotion: string
}

export default function EmotionPicker({
  emotion,
  selectedEmotion,
  onChangeEmotion,
}: Props) {
  return (
    <List.Row
      onClick={() => onChangeEmotion(emotion.percent)}
      className="group relative flex size-10 cursor-pointer justify-center"
    >
      <Button
        variant="emptyStyle"
        size="sm"
        onClick={() => onChangeEmotion(emotion.percent)}
        className="absolute flex flex-col gap-2 font-medium text-gray-400 hover:opacity-100"
      >
        <Text type="caption" size="sm" className="absolute top-4">
          {emotion.status}
        </Text>
        <RefBox
          className={cn(
            'absolute top-1 size-2 rounded-full bg-gray-300 ring-1 ring-gray-200 transition group-hover:ring-4 dark:bg-var-darkgray dark:ring-gray-600',
            selectedEmotion === emotion.percent && 'bg-slate-700 ring-4',
          )}
        />
      </Button>
    </List.Row>
  )
}
