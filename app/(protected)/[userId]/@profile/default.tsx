import AboutMe from './_components/AboutMe'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { createServerClient } from '@/lib/supabase/server'
import { userQuery } from '@/services/queries/auth/userQuery'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import Container from '../_components/Container'
import { meQuery } from '@/services/queries/auth/meQuery'

interface Props {
  params: { userId: string }
}

export default function Profile({ params }: Props) {
  const userId = params.userId
  const queryClient = getQueryClient()
  const supabase = createServerClient()

  queryClient.prefetchQuery(meQuery.getUserSession(supabase))
  queryClient.prefetchQuery(userQuery.getUserInfo(supabase, userId))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container>
        <AboutMe userId={userId} />
      </Container>
    </HydrationBoundary>
  )
}
