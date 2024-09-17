import { RefObject } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import useSignOut from '@/services/mutates/auth/useSignOut'
import { meQuery } from '@/services/queries/auth/meQuery'
import Title from '@/components/shared/Title'
import Avatar from '@/components/feature/user/Avatar'
import Box from '@/components/shared/Box'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import LinkButton from '@/components/shared/LinkButton'
import RefContainer from '@/components/shared/RefContainer'
import Text from '@/components/shared/Text'

interface Props {
  targetRef: RefObject<HTMLDivElement>
  onTransitionEnd: () => void
}

export default function HeaderNavSectionDropDown({
  targetRef,
  onTransitionEnd,
}: Props) {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))

  const { mutate: signOut } = useSignOut()
  const validateEmail = me?.email?.split('@')[0]
  return (
    <RefContainer
      ref={targetRef}
      dataStatus="closed"
      isRounded
      isBackground
      onTransitionEnd={onTransitionEnd}
      className="data-slideDown status-slideDown absolute right-0 top-[calc(100%--4px)] hidden h-fit w-60 origin-top-right p-2 shadow-md"
    >
      <LinkButton
        href="/mypage"
        variant="list"
        className="flex"
        innerClassName="flex gap-4"
      >
        <Avatar src={me?.avatar_url} size="sm" ring="xs" shadow="sm" />
        <Box col className="items-start">
          <Title size="xs">{me?.user_name}</Title>
          <Text type="caption" size="sm">
            @{validateEmail}
          </Text>
          <Box row className="gap-2">
            <Text size="sm" className="text-nowrap">
              마이 페이지 가기
            </Text>
            <Box row className="items-center text-gray-500 dark:text-gray-400">
              <Icon view={150} size={10}>
                <g id="forward">
                  <path d="M16.09,142.64c-2.36-10.16-3.01-21.3-.9-32.59,2.08-11.27,6.82-22.55,13.82-32.64,6.99-10.11,16.1-19.07,26.87-26.32,5.39-3.63,11.23-6.81,17.55-9.46,6.33-2.64,13.15-4.75,20.67-5.99v58c-2.67-1.19-6.02-2.04-9.63-2.48-3.62-.43-7.52-.48-11.48-.08-7.94.78-16.17,3.15-23.83,7.19-7.67,4.04-14.8,9.82-20.58,17.36-5.78,7.52-10.01,16.82-12.48,27.01Z" />
                  <polygon points="70.09 125.86 70.09 7.36 136.09 66.61 70.09 125.86" />
                </g>
              </Icon>
            </Box>
          </Box>
        </Box>
      </LinkButton>
      <Box className="sm:hidden">
        <LinkButton href="/post" variant="list" innerClassName="py-2">
          글쓰기
        </LinkButton>
        <LinkButton href="/post/sentence" variant="list" innerClassName="py-2">
          한줄쓰기
        </LinkButton>
      </Box>
      <LinkButton href="/todo" variant="list" innerClassName="py-2 flex gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="18px"
          fill="currentColor"
        >
          <path d="m381-240 424-424-57-56-368 367-169-170-57 57 227 226Zm0 113L42-466l169-170 170 170 366-367 172 168-538 538Z" />
        </svg>
        할일 관리
      </LinkButton>
      <Box row>
        <LinkButton href="/settings" variant="list" innerClassName="py-2 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 -960 960 960"
            width="18px"
            fill="currentColor"
          >
            <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
          </svg>
          설정
        </LinkButton>
      </Box>
      <Button
        onClick={() => signOut()}
        variant="list"
        className="flex w-full gap-2 py-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="18px"
          fill="currentColor"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
        </svg>
        로그아웃
      </Button>
    </RefContainer>
  )
}
