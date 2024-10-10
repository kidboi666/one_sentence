'use client'

import { meQuery } from '@/services/queries/auth/meQuery'
import { MouseEvent } from 'react'
import Modal from '@/components/shared/Modal'
import { supabase } from '@/lib/supabase/client'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import SentenceHeader from '@/components/feature/sentence/sentence/SentenceHeader'
import SentenceContent from '@/components/feature/sentence/sentence/SentenceContent'
import useBlockEditor from '@/hooks/useBlockEditor'
import useFavoriteSentence from '@/services/mutates/sentence/useFavoriteSentence'

interface Props {
  params: { sentenceId: string }
}

export default function SentenceInfoModal({ params }: Props) {
  const sentenceId = params.sentenceId
  const { data: sentence } = useSuspenseQuery(
    sentenceQuery.getSentence(supabase, sentenceId),
  )
  const { data } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, data?.userId),
  )
  const { editor } = useBlockEditor({ content: sentence?.content })
  const { mutate: favoriteSentence } = useFavoriteSentence()

  if (!editor) return null

  const handleFavoriteSentence = (
    e: MouseEvent,
    { sentenceId }: { sentenceId: number },
  ) => {
    e.stopPropagation()
    favoriteSentence({ userId: me.id || '', sentenceId })
  }

  return (
    <Modal className="gap-4">
      {sentence ? (
        <SentenceHeader
          isMe={sentence.user_id === me.id}
          email={sentence.email}
          avatarUrl={sentence.avatar_url}
          userName={sentence.user_name}
          emotionLevel={sentence.emotion_level}
          createdAt={sentence.created_at}
          accessType={sentence.access_type}
        />
      ) : null}
      <SentenceContent
        tags={sentence?.tags!}
        editor={editor}
        favoritedCount={sentence?.favorite || 0}
        favoritedUserId={sentence?.favorited_user_id || []}
        commentCount={sentence?.comment || 0}
        sentenceId={sentence?.id!}
        onFavorite={handleFavoriteSentence}
        userId={me?.id}
        me={me!}
      />
    </Modal>
  )
}
