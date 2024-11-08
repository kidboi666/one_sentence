'use client'

import { PropsWithChildren } from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { countSentenceQuery } from '@/services/queries/sentence/countSentenceQuery'
import { PROFILE_NAVIGATE_MENUS } from '../_constants/Navigate'
import { Container } from '@/components/shared/Container'
import { ZStack } from '@/components/shared/Stack'
import MenuSection from './journal_garden/_components/MenuSection'

interface Props {
  params: { userId: string }
}

export default function Layout({ params, children }: PropsWithChildren<Props>) {
  const userId = params.userId
  const segment = useSelectedLayoutSegment()
  const { data: counts } = useSuspenseQueries({
    queries: ['journal', 'article'].map((type: any) =>
      countSentenceQuery.countAllSentence(supabase, userId, type),
    ),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      }
    },
  })
  const { data: likedCount } = useSuspenseQuery(
    countSentenceQuery.countLikedSentence(supabase, userId),
  )

  return (
    <>
      <Container className="overflow-x-auto rounded-md bg-white p-1 shadow-sm dark:bg-var-darkgray">
        <ZStack gap={2}>
          {PROFILE_NAVIGATE_MENUS.map((menu, idx) => (
            <MenuSection
              key={menu.id}
              menu={menu}
              idx={idx}
              segment={segment}
              userId={userId}
              counts={counts}
              likedCount={likedCount}
            />
          ))}
        </ZStack>
      </Container>
      {children}
    </>
  )
}
