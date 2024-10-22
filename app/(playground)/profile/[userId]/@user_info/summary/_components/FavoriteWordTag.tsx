import Button from '@/components/shared/Button'
import useDataDrivenAnimation from '@/hooks/useStateChange'
import { IFavoriteWord } from '@/types/sentence'
import TagInfo from './TagInfo'
import { useState } from 'react'
import { List } from '@/components/shared/List'
import useOutsideClick from '@/hooks/useOutsideClick'

interface Props {
  word: IFavoriteWord
}

export default function FavoriteWordTag({ word }: Props) {
  const [trigger, setTrigger] = useState(false)
  const { onClick, ref, close, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)

  const handleTagClick = () => {
    onClick()
    setTrigger(true)
  }
  return (
    <List.Row className="relative">
      <Button
        variant="secondary"
        size="sm"
        ref={buttonRef}
        onClick={handleTagClick}
        className="relative bg-white text-xs font-light text-gray-600 shadow-md dark:bg-var-darkgray"
      >
        {word.word}
      </Button>
      <TagInfo
        word={word}
        trigger={trigger}
        onTransitionEnd={onTransitionEnd}
        targetRef={ref}
      />
    </List.Row>
  )
}