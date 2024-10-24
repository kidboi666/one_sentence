import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { createServerClient } from '@/lib/supabase/server'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import PostSentenceContainer from './_container/PostSentenceContainer'
import SentenceContainer from './_container/SentenceContainer'
import { meQuery } from '@/services/queries/auth/meQuery'

export default function HomePage() {
  const supabase = createServerClient()
  const queryClient = getQueryClient()

  queryClient.prefetchQuery(meQuery.getUserSession(supabase))
  queryClient.prefetchQuery(sentenceQuery.getAllSentence(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostSentenceContainer />
      <SentenceContainer />
    </HydrationBoundary>
  )
}
