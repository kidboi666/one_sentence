import { XStack, YStack } from '@/components/shared/Stack'
import Text from '@/components/shared/Text'
import TextArea from '@/components/shared/TextArea'
import Title from '@/components/shared/Title'
import cn from '@/lib/cn'
import { ComponentProps } from 'react'

interface Props extends ComponentProps<'textarea'> {
  value: string
}

export default function AboutMeSection({ value, onChange }: Props) {
  return (
    <YStack gap={4}>
      <Title>한줄 소개</Title>
      <XStack className="items-end">
        <TextArea
          value={value ?? ''}
          onChange={onChange}
          className="bg-var-lightgray p-2 dark:bg-var-dark"
        />
        {value && (
          <Text
            size="sm"
            className={cn('text-nowrap', value?.length > 150 && 'text-red-600')}
          >{`${value?.length} / 150`}</Text>
        )}
      </XStack>
    </YStack>
  )
}
