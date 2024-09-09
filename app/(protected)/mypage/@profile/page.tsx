'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import Container from '@/components/shared/Container'
import AboutMeSection from './_components/about_me'
import NavigatorSection from './_components/navigator'

export default function ProfileSection() {
  const { data } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, data?.userId),
  )

  return (
    <Container
      isBackground
      className="mt-12 flex h-fit flex-col gap-8 rounded-md p-4 shadow-md max-lg:mx-4 lg:p-8"
    >
      <AboutMeSection avatarUrl={me?.avatar_url} userName={me?.user_name} />
      <NavigatorSection aboutMe={me?.about_me} />
    </Container>
  )
}
