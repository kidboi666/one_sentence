import { useSuspenseQuery } from '@tanstack/react-query'
import cn from '@/src/lib/cn'
import { supabase } from '@/src/lib/supabase/client'
import { colorTheme, useTheme } from '@/src/store/useTheme'
import { emotionQuery } from '@/src/services/queries/emotion/emotion-query'
import Text from '@/src/components/Text'

interface Props {
  userId: string
}

export default function EmotionAverage({ userId }: Props) {
  const { color } = useTheme()
  const { data: myAverageEmotion } = useSuspenseQuery(
    emotionQuery.getEmotionAverage(supabase, userId),
  )
  return (
    <div className="absolute -right-3 top-0">
      <Text
        size="xs"
        className={cn(
          'animate-cta-fadein-out rounded-lg px-1.5 py-1 font-semibold text-white',
          colorTheme({ color }),
          color === 'blue' && 'ring-var-blue/65',
          color === 'orange' && 'ring-var-orange/65',
          color === 'yellow' && 'ring-var-yellow/65',
          color === 'green' && 'ring-var-green/65',
          color === 'black' && 'ring-var-black/65 dark:ring-white/65',
        )}
      >
        {myAverageEmotion}%
      </Text>
    </div>
  )
}
