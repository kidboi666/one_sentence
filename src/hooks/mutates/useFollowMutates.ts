'use client'

import { ROUTES } from '@/src/ROUTES'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import useHandleFollow from '@/src/services/mutates/follow/useHandleFollow'
import { meQuery } from '@/src/services/queries/auth/me-query'
import useRouterPush from '@/src/hooks/useRouterPush'
import useRouterPushWithTransition from '@/src/hooks/useRouterPushWithTransition'

interface Props {
  isFollowing: boolean
  userId: string
}

export default function useFollowMutates({ isFollowing, userId }: Props) {
  const [isLoadingFollowerRoute, pushFollowerList] = useRouterPushWithTransition(
    ROUTES.modal.follow.follower(userId),
  )
  const [isLoadingFollowingRoute, pushFollowingList] = useRouterPushWithTransition(
    ROUTES.modal.follow.following(userId),
  )
  const authGuard = useRouterPush(ROUTES.modal.auth.guard, false)
  const { data: me } = useSuspenseQuery(meQuery.getSession(supabase))
  const { mutate: followOrUnfollow, isPending } = useHandleFollow()

  const handleFollow = (options?: any) => {
    me
      ? followOrUnfollow(
          {
            followed_user_id: userId,
            follower_user_id: me.userId,
            isFollowing,
          },
          { ...options },
        )
      : authGuard()
  }

  return {
    onFollow: handleFollow,
    pushFollowerList,
    pushFollowingList,
    isLoadingFollowerRoute,
    isLoadingFollowingRoute,
    isPending,
  }
}
