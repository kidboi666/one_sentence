import Avatar from '@/src/components/Avatar'
import Button from '@/src/components/Button'
import { Container } from '@/src/components/Container'
import { XStack, YStack } from '@/src/components/Stack'
import Text from '@/src/components/Text'

interface Props {
  follower: any
  onFollow: any
  isFollowing: boolean
  isMe: boolean
  pushUserPage: () => void
  isPending: boolean
}

/**
 * TODO 추후 타입핑 요망 @kidboi666
 */
export default function FollowUserCard({
  follower,
  onFollow,
  isFollowing,
  isMe,
  pushUserPage,
  isPending,
}: Props) {
  if (isMe)
    return (
      <Container
        onClick={pushUserPage}
        className="w-full cursor-pointer rounded-md p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700"
      >
        <XStack gap={4} key={follower.id} className="items-center">
          <Avatar size="base" src={follower.user_info.avatar_url} className="size-8" />
          <YStack gap={0} className="flex-1 justify-center">
            <Text>{follower.user_info.user_name}</Text>
            <Text type="caption" size="sm">
              @{follower.user_info.email.split('@')[0]}
            </Text>
          </YStack>
        </XStack>
      </Container>
    )

  return (
    <Container
      onClick={pushUserPage}
      className="w-full cursor-pointer rounded-md p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700"
    >
      <XStack gap={4} key={follower.id} className="items-center">
        <Avatar size="base" src={follower.user_info.avatar_url} className="size-8" />
        <YStack gap={0} className="flex-1 justify-center">
          <Text>{follower.user_info.user_name}</Text>
          <Text type="caption" size="sm">
            @{follower.user_info.email.split('@')[0]}
          </Text>
        </YStack>
        {isFollowing ? (
          <Button variant="secondary" size="sm" isLoading={isPending} onClick={onFollow}>
            팔로우 취소
          </Button>
        ) : (
          <Button className="h-fit" size="sm" isLoading={isPending} onClick={onFollow}>
            팔로우 하기
          </Button>
        )}
      </XStack>
    </Container>
  )
}
