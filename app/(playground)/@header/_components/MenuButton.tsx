'use client'

import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import useDataDrivenAnimation from '@/hooks/useStateChange'
import MobileMenu from './MobileMenu'
import useOutsideClick from '@/hooks/useOutsideClick'
import { Container } from '@/components/shared/Container'
import useToggle from '@/hooks/useToggle'

export default function MenuButton() {
  const { close, onClick, ref, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLDivElement>(close)
  const { isOpen, close: closeMenu, toggle } = useToggle()

  const handleToggle = () => {
    onClick()
    toggle()
  }

  const handleClose = () => {
    close()
    closeMenu()
  }

  return (
    <>
      <Container ref={buttonRef}>
        <Button
          variant="icon"
          size="icon"
          onClick={handleToggle}
          className="flex sm:hidden"
        >
          <Icon view="0 -960 960 960" size={24}>
            <path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z" />
          </Icon>
        </Button>
        <MobileMenu
          isOpen={isOpen}
          targetRef={ref}
          close={handleClose}
          onTransitionEnd={onTransitionEnd}
        />
      </Container>
    </>
  )
}
