import Button from '@/components/shared/Button'
import Text from '@/components/shared/Text'
import { RefObject } from 'react'
import Title from '@/components/shared/Title'
import Avatar from '@/components/feature/user/Avatar'
import LinkButton from '@/components/shared/LinkButton'

interface Props {
  targetRef: RefObject<HTMLDivElement>
  onTransitionEnd: () => void
  avatarUrl: string | null
  userName: string | null
  userId: string
  isMe: boolean
}

export default function AvatarOwnerInfoDropDown({
  targetRef,
  onTransitionEnd,
  avatarUrl,
  userName,
  userId,
  isMe,
}: Props) {
  return (
    <div
      ref={targetRef}
      data-status="closed"
      onTransitionEnd={onTransitionEnd}
      className="absolute left-0 top-full z-30 hidden size-fit origin-top transition data-[status=closed]:scale-95 data-[status=closed]:opacity-0"
    >
      <div className="flex flex-col gap-4 text-nowrap rounded-md bg-white p-4 shadow-lg dark:bg-var-darkgray">
        <div className="flex flex-col items-center gap-2">
          <Avatar src={avatarUrl} size="sm" hoverEffect="none" />
          <Title type="sub" size="sm">
            {userName}
          </Title>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            <Text size="sm" type="caption">
              팔로잉
              <Text as="span" size="sm">
                4명
              </Text>
            </Text>
            <Text size="sm" type="caption">
              팔로워
              <Text as="span" size="sm">
                24명
              </Text>
            </Text>
          </div>
          {isMe ? (
            <div className="flex gap-2">
              <LinkButton href="/edit_profile" size="sm" variant="secondary">
                프로필 수정
              </LinkButton>
              <LinkButton href={`/${userId}`} size="sm">
                마이 페이지
              </LinkButton>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button size="sm" variant="secondary">
                팔로우 하기
              </Button>
              <LinkButton href={`/${userId}`} size="sm">
                프로필 페이지
              </LinkButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
