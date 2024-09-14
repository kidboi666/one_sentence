'use client'

import Box from '@/components/shared/Box'
import Button from '@/components/shared/Button'
import LinkButton from '@/components/shared/LinkButton'
import Text from '@/components/shared/Text'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function NavigatorSection() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))

  if (!me) return null

  return (
    <>
      <Box className="flex flex-col gap-8">
        <Text type="caption">
          {me.about_me ? me.about_me : '자기 소개를 작성해주세요.'}
        </Text>
        <Box col className="gap-4">
          <Box row className="gap-4">
            <LinkButton
              href="/edit_profile"
              variant="secondary"
              className="flex-1 text-nowrap"
            >
              프로필 수정
            </LinkButton>
            <LinkButton href="/post" className="flex-1">
              글쓰기
            </LinkButton>
          </Box>
          <Button className="w-full">루틴 계획하기</Button>
        </Box>
      </Box>
    </>
  )
}
