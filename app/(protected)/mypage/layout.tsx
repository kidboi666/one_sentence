import { PropsWithChildren, ReactNode } from 'react'
import Container from '@/components/shared/Container'
import Box from '@/components/shared/Box'
import { createServerClient } from '@/lib/supabase/server'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { ISessionInfo } from '@/types/auth'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

interface Props {
  profile: ReactNode
  user_info: ReactNode
}

export default async function UserLayout({
  profile,
  user_info,
}: PropsWithChildren<Props>) {
  const supabase = createServerClient()
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(meQuery.getUserSession(supabase))
  const res = queryClient.getQueryData<ISessionInfo>(['me', 'session'])

  if (!res) return
  queryClient.prefetchQuery(meQuery.getUserInfo(supabase, res?.userId))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container className="flex w-full animate-fade-in flex-col justify-center gap-8 lg:flex-row">
        <Box className="h-fit w-full flex-1 lg:sticky lg:top-20 lg:max-w-[300px]">
          {profile}
        </Box>
        <Box className="flex w-full flex-col gap-12 py-12 max-lg:px-4 lg:max-w-[768px]">
          {user_info}
        </Box>
      </Container>
    </HydrationBoundary>
  )
}
