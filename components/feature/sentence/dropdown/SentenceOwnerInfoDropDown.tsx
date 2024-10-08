import Button from '@/components/shared/Button'
import Text from '@/components/shared/Text'
import { RefObject } from 'react'
import Title from '@/components/shared/Title'
import Avatar from '@/components/feature/user/Avatar'

interface Props {
  targetRef: RefObject<HTMLDivElement>
  onTransitionEnd: () => void
  avatarUrl: string | null
  userName: string | null
  isMe: boolean
}

export default function SentenceOwnerInfoDropDown({
  targetRef,
  onTransitionEnd,
  avatarUrl,
  userName,
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
              <Button size="sm" variant="secondary">
                프로필 수정
              </Button>
              <Button size="sm">한줄 쓰기</Button>
            </div>
          ) : (
            <Button size="sm">팔로우 하기</Button>
          )}
        </div>
      </div>
    </div>
  )
}
