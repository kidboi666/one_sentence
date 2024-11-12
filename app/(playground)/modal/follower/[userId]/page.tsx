'use client'

import Modal from '@/components/shared/Modal'
import { YStack } from '@/components/shared/Stack'
import { supabase } from '@/lib/supabase/client'
import useFollow from '@/services/mutates/follow/useFollow'
import useUnFollow from '@/services/mutates/follow/useUnFollow'
import { followQuery } from '@/services/queries/follow/followQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import FollowUserCard from '../../_components/FollowUserCard'
import { useRouter } from 'next/navigation'
import useMe from '@/hooks/useMe'
import { MouseEvent } from 'react'
import { routes } from '@/routes'
import useFetchWithDelay from '@/hooks/useFetchWithDelay'

interface Props {
  params: { userId: string }
}

export default function FollowerListModal({ params }: Props) {
  const router = useRouter()
  const { me, session } = useMe()
  const { data: followers } = useSuspenseQuery(
    followQuery.getFollower(supabase, params.userId),
  )
  const { data: myFollows } = useSuspenseQuery(
    followQuery.getFollowing(supabase, me?.id),
  )
  const { mutate: followUser, isPending: isPendingFollowUser } = useFollow()
  const { mutate: unfollowUser, isPending: isPendingUnfollowUser } =
    useUnFollow()
  const isPending = useFetchWithDelay(
    isPendingFollowUser || isPendingUnfollowUser,
  )

  const handleFollowUser = (e: MouseEvent, userId: string) => {
    e.stopPropagation()
    if (!session) return router.push(routes.modal.auth.guard)
    followUser({
      followed_user_id: userId,
      follower_user_id: me!.id,
    })
  }

  const handleUnfollowUser = (e: MouseEvent, userId: string) => {
    e.stopPropagation()
    if (!session) return router.push(routes.modal.auth.guard)
    unfollowUser({
      followed_user_id: userId,
      follower_user_id: me!.id,
    })
  }

  const handlePushUserPage = (userId: string) => {
    router.push(routes.profile.view(userId), { scroll: false })
  }

  return (
    <Modal>
      <YStack className="w-full">
        {followers?.map((follower) => {
          const isFollowing = myFollows?.find(
            (user: any) => user.followed_user_id === follower.user_info.id,
          )
          const isMe = me?.id === follower.user_info.id

          return (
            <FollowUserCard
              key={follower.id}
              isFollowing={isFollowing}
              isMe={isMe}
              follower={follower}
              follow={(e: MouseEvent) =>
                handleFollowUser(e, follower.user_info.id)
              }
              unfollow={(e: MouseEvent) =>
                handleUnfollowUser(e, follower.user_info.id)
              }
              isPending={isPending}
              pushUserPage={() => handlePushUserPage(follower.user_info.id)}
            />
          )
        })}
      </YStack>
    </Modal>
  )
}
