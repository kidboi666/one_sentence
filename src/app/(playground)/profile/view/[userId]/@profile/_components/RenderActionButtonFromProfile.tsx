'use client'

import Button from '@/src/components/Button'
import { XStack } from '@/src/components/Stack'
import useFollowMutates from '@/src/hooks/mutates/useFollowMutates'
import useRouterPushWithTransition from '@/src/hooks/useRouterPushWithTransition'
import { routes } from '@/src/routes'
import useMeQueries from '@/src/hooks/queries/useMeQueries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { userQuery } from '@/src/services/queries/auth/user-query'
import { supabase } from '@/src/lib/supabase/client'
import useFollowQueries from '@/src/hooks/queries/useFollowQueries'

interface Props {
  userId: string
}

export default function RenderActionButtonFromProfile({ userId }: Props) {
  const { me } = useMeQueries()
  const { data: user } = useSuspenseQuery(
    userQuery.getUserInfo(supabase, userId),
  )
  const { isFollowing } = useFollowQueries({ meId: me.id, userId })
  const { onFollow, isPending } = useFollowMutates({
    isFollowing,
    me,
    userId,
  })

  const isMyProfilePage = me?.id === user?.id

  const [isLoadingProfile, handlePushEditProfilePage] =
    useRouterPushWithTransition(routes.profile.edit)
  const [isLoadingWrite, handlePushNewPostPage] = useRouterPushWithTransition(
    routes.post.new,
  )

  const handleSendMessageButtonClick = () => {
    return null
    /**
     * TODO 추후 redis 같은 db로 기능 구현 @kidboi666
     */
  }

  return (
    <XStack gap={4}>
      {isMyProfilePage ? (
        <>
          <Button
            variant="secondary"
            size="sm"
            isLoading={isLoadingProfile}
            onClick={handlePushEditProfilePage}
            className="text-nowrap"
          >
            프로필 수정
          </Button>
          <Button
            size="sm"
            isLoading={isLoadingWrite}
            onClick={handlePushNewPostPage}
          >
            글쓰기
          </Button>
        </>
      ) : (
        <>
          <Button
            variant={isFollowing ? 'secondary' : 'primary'}
            size="sm"
            isLoading={isPending}
            onClick={onFollow}
          >
            {isFollowing ? '팔로우 취소' : '팔로우 하기'}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleSendMessageButtonClick}
          >
            메시지 보내기
          </Button>
        </>
      )}
    </XStack>
  )
}
