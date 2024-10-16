import Avatar from '@/components/shared/Avatar'
import { ComponentProps, useRef } from 'react'

interface Props extends ComponentProps<'input'> {
  imagePreview: string | null
}

export default function ProfileImageSection({ onChange, imagePreview }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handlePreviewClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }
  return (
    <div
      onClick={() => handlePreviewClick()}
      className="relative flex cursor-pointer flex-col items-center max-sm:-order-1"
    >
      <Avatar src={imagePreview} size="xl" ring="md" shadow="sm" />
      <input
        ref={inputRef}
        type="file"
        onChange={onChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  )
}
