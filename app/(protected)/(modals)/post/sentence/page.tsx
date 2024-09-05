'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, Suspense, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { formatDateToYMD } from '@/utils/formatDate'
import { meQuery } from '@/services/queries/auth/meQuery'
import { useInput } from '@/hooks/useInput'
import { INIT_STATUS, WEEKDAY } from './_constants'
import useAddSentence from '@/services/mutates/sentence/useAddSentence'

import Spinner, { Size } from '@/components/shared/Spinner'
import Title from '@/components/shared/Title'
import Modal from '@/components/shared/Modal'
import EmotionSection from './_components/EmotionSection'
import SentenceSection from './_components/SentenceSection'

export default function SentenceModal() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const [sentence, onChangeSentence, setSentence] = useInput('')
  const [selectedStatus, setSelectedStatus] = useState(INIT_STATUS)
  const { mutate: addSentence, isPending } = useAddSentence()
  const router = useRouter()

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
          router.push('/success')
          setSentence('')
          setSelectedStatus(INIT_STATUS)
        },
      },
    )
  }

  return (
    <Modal>
      <Suspense fallback={<Spinner size={Size.l} />}>
        <div className="flex w-full animate-fade-in flex-col items-center justify-between gap-20 px-4 md:px-12 xl:max-w-[768px]">
          <Title>
            {`${formatDateToYMD(new Date().toString())}(${WEEKDAY[new Date().getDay()]}) 기록`}
          </Title>
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
        </div>
      </Suspense>
    </Modal>
  )
}