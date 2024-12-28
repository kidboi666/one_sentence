import { XStack, YStack } from '@/src/components/Stack'
import Avatar from '@/src/components/Avatar'
import Title from '@/src/components/Title'
import Follow from '@/src/components/Follow'
import { DropDown } from '@/src/components/DropDown'
import { routes } from '@/src/routes'
import { useTransition } from 'react'
import useFollowQueries from '@/src/hooks/queries/useFollowQueries'
import useFollowMutates from '@/src/hooks/mutates/useFollowMutates'

interface Props {
  avatarUrl: string | null
  userName: string | null
  userId: string
}

export default function AvatarButtonWithDropDownContent({
  userId,
  userName,
  avatarUrl,
}: Props) {
  const [isLoadingFollowing, startTransitionFollowing] = useTransition()
  const { followingCount, followerCount, isFollowing, isMe } = useFollowQueries(
    {
      userId,
    },
  )
  const {
    onFollow,
    pushFollowingList,
    isLoadingFollowerRoute,
    pushFollowerList,
    isLoadingFollowingRoute,
  } = useFollowMutates({
    isFollowing,
    userId,
  })

  return (
    <YStack gap={4} className="p-4">
      <YStack gap={4} className="items-center">
        <Avatar src={avatarUrl} size="sm" />
        <Title type="sub" size="sm">
          {userName}
        </Title>
      </YStack>
      <YStack gap={4} className="items-center">
        <Follow>
          <Follow.Follower
            followerCount={followerCount}
            isLoading={isLoadingFollowerRoute}
            onClick={pushFollowerList}
          />
          <Follow.Following
            followingCount={followingCount}
            isLoading={isLoadingFollowingRoute}
            onClick={pushFollowingList}
          />
        </Follow>
        <XStack gap={4}>
          {isMe ? (
            <>
              <DropDown.LinkButton
                href={routes.profile.edit}
                variant="secondary"
              >
                프로필 수정
              </DropDown.LinkButton>
              <DropDown.LinkButton href={routes.profile.view(userId)}>
                마이 페이지
              </DropDown.LinkButton>
            </>
          ) : (
            <>
              <DropDown.Button
                variant="secondary"
                isLoading={isLoadingFollowing}
                onClick={() => startTransitionFollowing(() => onFollow())}
              >
                {isFollowing ? '팔로우 취소' : '팔로우 하기'}
              </DropDown.Button>
              <DropDown.LinkButton href={routes.profile.view(userId)}>
                프로필 페이지
              </DropDown.LinkButton>
            </>
          )}
        </XStack>
      </YStack>
    </YStack>
  )
}
