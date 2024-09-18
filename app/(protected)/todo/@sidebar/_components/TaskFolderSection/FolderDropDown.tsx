import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import RefContainer from '@/components/shared/RefContainer'
import { useRouter } from 'next/navigation'
import { RefObject } from 'react'

interface Props {
  targetRef: RefObject<HTMLDivElement>
  onTransitionEnd: () => void
  folderId: number
}

export default function FolderDropDown({
  targetRef,
  onTransitionEnd,
  folderId,
}: Props) {
  const router = useRouter()
  return (
    <RefContainer
      ref={targetRef}
      onTransitionEnd={onTransitionEnd}
      dataStatus="closed"
      isRounded
      isBackground
      className="data-slideDown status-slideDown absolute right-0 top-[calc(100%--4px)] z-30 hidden size-fit origin-top-right bg-var-lightgray p-2 shadow-md dark:bg-var-dark"
    >
      <Button
        variant="list"
        onClick={() => router.push(`/todo/delete_todo_folder/${folderId}`)}
        className="w-full gap-2 py-2 hover:bg-white dark:hover:bg-var-darkgray"
      >
        삭제
        <Icon view="0 -960 960 960" size={16}>
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </Icon>
      </Button>
      <Button
        variant="list"
        onClick={() => router.push(`/todo/edit_todo_folder/${folderId}`)}
        className="w-full gap-2 text-nowrap py-2 hover:bg-white dark:hover:bg-var-darkgray"
      >
        수정
        <Icon view="0 -960 960 960" size={16}>
          <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
        </Icon>
      </Button>
    </RefContainer>
  )
}
