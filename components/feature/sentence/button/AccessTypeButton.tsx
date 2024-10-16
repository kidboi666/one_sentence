import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import { List } from '@/components/shared/List'
import SentenceAccessTypeDropDown from '../dropdown/SentenceAccessTypeDropDown'
import useStateChange from '@/hooks/useStateChange'
import { MouseEvent } from 'react'
import useOutsideClick from '@/hooks/useOutsideClick'

interface Props {
  accessType?: string | null
}

export default function AccessTypeButton({ accessType }: Props) {
  const { close, ref, onClick, onTransitionEnd } =
    useStateChange<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)

  const handleButtonClick = (e: MouseEvent) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <List.Row className="relative">
      <Button
        ref={buttonRef}
        variant="icon"
        size="icon"
        onClick={handleButtonClick}
        className="hover:text-green-400 dark:hover:text-green-400"
      >
        <Icon view="0 -960 960 960" size={18}>
          {accessType === 'public' ? (
            <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q20-22 36-47.5t26.5-53q10.5-27.5 16-56.5t5.5-59q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z" />
          ) : (
            <path d="M819-28 701-146q-48 32-103.5 49T480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-62 17-117.5T146-701L27-820l57-57L876-85l-57 57ZM440-162v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm374-99-58-58q21-37 32.5-77.5T800-480q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v45L261-814q48-31 103-48.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 61-17.5 116T814-261Z" />
          )}
        </Icon>
      </Button>
      <SentenceAccessTypeDropDown
        accessType={accessType}
        targetRef={ref}
        onTransitionEnd={onTransitionEnd}
      />
    </List.Row>
  )
}
