import Avatar from '@/components/shared/Avatar'
import { DropDown } from '@/components/shared/DropDown'
import useDataDrivenAnimation from '@/hooks/useStateChange'
import BookMark from './BookMark'
import useOutsideClick from '@/hooks/useOutsideClick'
import LoggedInContent from './LoggedInContent'
import GuestContent from './GuestContent'
import Text from '@/components/shared/Text'
import { IUserInfoWithMBTI } from '@/types/auth'
import { IUserSession } from '@/services/queries/auth/me-query'

interface Props {
  pathname: string
  userId: string
  viewText?: boolean
  me?: IUserInfoWithMBTI
  session?: IUserSession | null
  closeMenu?: () => void
}

export default function AuthButtonWithDropDown({
  pathname,
  userId,
  viewText,
  me,
  session,
  closeMenu,
}: Props) {
  const { ref, close, onClick, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)

  return (
    <DropDown.Root className="group">
      <BookMark me={me} userId={userId} pathname={pathname} />
      <DropDown.Trigger
        targetRef={buttonRef}
        variant="none"
        onClick={onClick}
        className="gap-4 px-1 py-1"
      >
        <Avatar src={me?.avatar_url} ring shadow="sm" className="size-10" />
        <Text type="caption">{viewText && me?.email}</Text>
      </DropDown.Trigger>
      <DropDown.Content
        ref={ref}
        initStatus="closed"
        onTransitionEnd={onTransitionEnd}
        position="topRight"
      >
        {session ? (
          <LoggedInContent me={me} closeMenu={closeMenu} />
        ) : (
          <GuestContent closeMenu={closeMenu} />
        )}
      </DropDown.Content>
    </DropDown.Root>
  )
}
