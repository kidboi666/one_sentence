import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import cn from '@/lib/cn'

import { ISentenceState } from '@/store/useSentence'
import useBlockEditor from '@/hooks/useBlockEditor'
import { meQuery } from '@/services/queries/auth/meQuery'
import { followQuery } from '@/services/queries/follow/followQuery'
import useFavoriteSentence from '@/services/mutates/sentence/useFavoriteSentence'
import { ISentenceWithUserInfo } from '@/types/sentence'

import SentenceHeader from './SentenceHeader'
import SentenceContent from './SentenceContent'

interface Props {
  sentence?: ISentenceWithUserInfo
  sentenceSummary?: ISentenceState
  userId: string | null
  className?: string
  disabled?: boolean
}

export default function SentenceCard({
  sentence,
  userId,
  sentenceSummary,
  className,
  disabled,
}: Props) {
  const sentenceId = sentence?.id || sentenceSummary?.id
  const content = sentence?.content || sentenceSummary?.content
  const tags = sentence?.tags || sentenceSummary?.tags
  const router = useRouter()
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, userId || ''),
  )
  const { data: followers } = useSuspenseQuery(
    followQuery.getFollowers(supabase, sentence?.user_id),
  )
  const { data: followings } = useSuspenseQuery(
    followQuery.getFollwing(supabase, sentence?.user_id),
  )
  const isFollowing = followers?.find(
    (user) => user.follower_user_id === userId,
  )
  const { editor } = useBlockEditor({
    content,
  })
  const { mutate: favoriteSentence } = useFavoriteSentence()

  const handleFavoriteSentence = (
    e: MouseEvent,
    { sentenceId }: { sentenceId: number },
  ) => {
    e.stopPropagation()
    favoriteSentence({ userId: userId || '', sentenceId })
  }

  const handleSentenceItemClick = () => {
    router.push(`/sentence_page/${sentenceId}`)
  }

  if (!editor) return null

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {sentence ? (
        <SentenceHeader
          userId={sentence.user_id}
          meId={me?.id}
          isMe={me?.id === sentence.user_id}
          isFollowing={!!isFollowing}
          followers={followers}
          followings={followings}
          email={sentence.user_info.email}
          avatarUrl={sentence.user_info.avatar_url}
          userName={sentence.user_info.user_name}
          emotionLevel={sentence.emotion_level}
          createdAt={sentence.created_at}
        />
      ) : null}
      <SentenceContent
        tags={tags}
        editor={editor}
        sentenceTitle={sentence?.title}
        accessType={sentence?.access_type}
        favoritedCount={sentence?.favorite || 0}
        favoritedUserId={sentence?.favorited_user_id || []}
        commentCount={sentence?.comment || 0}
        sentenceId={sentenceId!}
        onFavorite={handleFavoriteSentence}
        onClick={handleSentenceItemClick}
        userId={userId}
        me={me}
        disabled={disabled}
      />
    </div>
  )
}
