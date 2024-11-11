'use client'

import { useRouter } from 'next/navigation'
import Avatar from '@/components/shared/Avatar'
import Text from '@/components/shared/Text'
import { useTheme } from '@/store/useTheme'
import cn from '@/lib/cn'
import { XStack } from '@/components/shared/Stack'
import { Container } from '@/components/shared/Container'
import useMe from '@/hooks/useMe'

export default function PostSentenceContainer() {
  const router = useRouter()
  const { me, session } = useMe()
  const { color } = useTheme()

  const handleSentenceClick = () => {
    session ? router.push('/write') : router.push('/modal/auth_guard')
  }

  return (
    <Container onClick={handleSentenceClick}>
      <XStack gap={4}>
        <Avatar
          src={me?.avatar_url}
          size="sm"
          shadow="sm"
          className="max-sm:hidden"
        />
        <Container
          className={cn(
            'w-full min-w-0 animate-cta-fadein-out items-center rounded-md bg-white p-2 text-sm dark:bg-var-darkgray',
            color === 'blue' && 'ring-var-blue/65',
            color === 'orange' && 'ring-var-orange/65',
            color === 'yellow' && 'ring-var-yellow/65',
            color === 'green' && 'ring-var-green/65',
            color === 'black' && 'ring-var-black/65',
          )}
        >
          {/**
           * 스타일 적용 문제 @kidboi666
           * ringTheme를 사용한 스타일링이 간헐적으로 적용되는 문제 발생
           * tailwind.config 에 있는 animate 와 충돌이 있는듯 보임
           */}
          <Text type="caption">오늘 당신의 생각을 한 줄로 기록하세요.</Text>
        </Container>
      </XStack>
    </Container>
  )
}
