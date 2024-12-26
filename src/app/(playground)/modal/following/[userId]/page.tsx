'use client'

import Modal from '@/src/components/shared/Modal'
import { YStack } from '@/src/components/shared/Stack'
import useHandleFollow from '@/src/services/mutates/follow/useHandleFollow'
import FollowUserCard from '../../_components/FollowUserCard'
import { useRouter } from 'next/navigation'
import useMe from '@/src/hooks/useMe'
import { routes } from '@/src/routes'
import { useState } from 'react'
import useFollowQuery from '@/src/hooks/query/useFollowQuery'

interface Props {
  params: { userId: string }
}

export default function FollowingListModal({ params }: Props) {
  const router = useRouter()
  const userId = params.userId
  const { me, session } = useMe()
  const { followings, myFollows } = useFollowQuery({
    userId,
    meId: me.id,
  })
  const { mutate: followOrUnfollow } = useHandleFollow()
  const [pendingList, setPendingList] = useState<Record<string, boolean>>({})

  const handleFollow = (
    e: MouseEvent,
    userId: string,
    isFollowing: boolean,
  ) => {
    e.stopPropagation()
    if (!session) return router.push(routes.modal.auth.guard)

    setPendingList((prev) => ({ ...prev, [userId]: true }))
    followOrUnfollow(
      {
        followed_user_id: userId,
        follower_user_id: me!.id,
        isFollowing,
      },
      {
        onSettled: () => {
          setPendingList((prev) => ({ ...prev, [userId]: false }))
        },
      },
    )
  }

  const handlePushUserPage = (userId: string) => {
    router.push(routes.profile.view(userId), { scroll: false })
  }

  return (
    <Modal>
      <YStack className="w-full">
        {followings?.map((user) => {
          const isFollowing = myFollows?.find(
            (myFollower: any) =>
              myFollower.followed_user_id === user.user_info.id,
          )
          const isMe = me?.id === user.followed_user_id
          const isPending = pendingList[user.user_info.id] || false

          return (
            <FollowUserCard
              key={user.id}
              isFollowing={!!isFollowing}
              isMe={isMe}
              follower={user}
              onFollow={(e: MouseEvent) =>
                handleFollow(e, user.user_info.id, !!isFollowing)
              }
              pushUserPage={() => handlePushUserPage(user.user_info.id)}
              isPending={isPending}
            />
          )
        })}
      </YStack>
    </Modal>
  )
}
