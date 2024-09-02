'use client'

import { FormEvent, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createBrowserClient } from '@/lib/supabase/client'
import { useModal } from '@/store/useModal'
import { meQuery } from '@/services/queries/auth/meQuery'
import useAddSentence from '@/services/mutates/sentence/useAddSentence'
import { useInput } from '@/hooks/useInput'

import { INIT_STATUS } from '../_constants'
import EmotionSection from './EmotionSection'
import SentenceSection from './SentenceSection'

export default function WritingFormSection() {
  const supabase = createBrowserClient()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { mutate: addSentence, isPending } = useAddSentence()
  const [sentence, onChangeSentence, setSentence] = useInput('')
  const { openModal } = useModal()
  const [selectedStatus, setSelectedStatus] = useState(INIT_STATUS)

  const handleStatusClick = (status: typeof INIT_STATUS) => {
    setSelectedStatus({ percent: status.percent, color: status.color })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    addSentence(
      {
        content: sentence,
        emotion_level: selectedStatus.percent,
        user_id: me?.sub,
      },
      {
        onSuccess: () => {
          openModal('success', {
            onSubmit: () => {
              setSentence('')
              setSelectedStatus(INIT_STATUS)
            },
          })
        },
      },
    )
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center gap-20"
    >
      <div className="flex flex-col items-center gap-8">
        <EmotionSection
          selectedStatus={selectedStatus}
          onStatusClick={handleStatusClick}
        />
      </div>
      <div className="flex w-full flex-col items-center gap-8 md:w-[400px]">
        <SentenceSection
          onChangeSentence={onChangeSentence}
          selectedStatusPercent={selectedStatus.percent}
          sentence={sentence}
          isPending={isPending}
        />
      </div>
    </form>
  )
}