'use client'

import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { getSignUpDays } from '@/utils/formatDate'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function Summary() {
  const { data } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, data?.sub),
  )
  const { data: sentence } = useSuspenseQuery(
    sentenceQuery.getSentence(supabase, data?.sub),
  )

  return (
    <div className="flex w-full justify-between py-12">
      <div className="flex flex-col gap-2">
        <Text type="caption">시작한지</Text>
        <Title size="bigger" type="sub">
          {getSignUpDays(me?.created_at) === '오늘' ? (
            getSignUpDays(me?.created_at)
          ) : (
            <>
              {getSignUpDays(me?.created_at)}
              <Text as="span">일 째</Text>
            </>
          )}
        </Title>
      </div>
      <div className="flex flex-col gap-2">
        <Text type="caption">기록</Text>
        <Title size="bigger" type="sub">
          {sentence?.length}
          <Text as="span">개</Text>
        </Title>
      </div>
      <div className="flex flex-col gap-2">
        <Text type="caption">평균 달성률</Text>
        <Title size="bigger" type="sub">
          미구현
        </Title>
      </div>
    </div>
  )
}