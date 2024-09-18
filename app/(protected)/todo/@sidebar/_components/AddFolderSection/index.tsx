import Button from '@/components/shared/Button'

interface Props {
  isOpenSide?: boolean
  onClick: () => void
}

export default function AddFolderSection({ isOpenSide, onClick }: Props) {
  return (
    <Button variant="icon" onClick={onClick} className="gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 -960 960 960"
        width="20px"
        fill="currentColor"
      >
        <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
      </svg>
      {isOpenSide && '새 폴더 추가'}
    </Button>
  )
}
