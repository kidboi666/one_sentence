'use client'

import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import useIntersect from '@/hooks/useIntersect'
import { meQuery } from '@/services/queries/auth/meQuery'
import { userQuery } from '@/services/queries/auth/userQuery'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import SentenceCard from '@/app/(playground)/home/_components/SentenceCard'
import { Container } from '@/components/shared/Container'
import Empty from '@/components/shared/Empty'
import Spinner from '@/components/shared/Spinner'
import { YStack } from '@/components/shared/Stack'
import Title from '@/components/shared/Title'

export default function Articles() {
  const limit = 4
  const [, , userId] = usePathname().split('/')
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: user } = useSuspenseQuery(
    userQuery.getUserInfo(supabase, userId),
  )
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(
      sentenceQuery.getAllMySentence(supabase, userId, 'article', limit),
    )
  const articles = data.pages.flatMap((article) => article || [])
  const [ref, inView] = useIntersect<HTMLDivElement>()
  const sentenceUserInfo = {
    email: user?.email,
    user_name: user?.user_name,
    avatar_url: user?.avatar_url,
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <Container>
      {articles.length > 0 ? (
        <YStack gap={8}>
          <Title></Title>
          {articles?.map((article) => (
            <SentenceCard
              key={article.id}
              meId={me?.userId}
              sentence={article}
              sentenceUserInfo={sentenceUserInfo}
            />
          ))}
          <div ref={ref} />
          {isFetchingNextPage && <Spinner size={60} />}
        </YStack>
      ) : (
        <Empty>
          <Empty.Text>아직 작성한 아티클이 없습니다.</Empty.Text>
        </Empty>
      )}
    </Container>
  )
}
