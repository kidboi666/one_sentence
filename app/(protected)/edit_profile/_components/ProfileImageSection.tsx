import Avatar from '@/components/feature/user/Avatar'
import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import Image from 'next/image'
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
    <Container
      onClick={() => handlePreviewClick()}
      className="relative flex cursor-pointer flex-col items-center max-sm:-order-1"
    >
      <Avatar src={imagePreview} size="xl" ring="md" />
      <input
        ref={inputRef}
        type="file"
        onChange={onChange}
        accept="image/*"
        className="hidden"
      />
    </Container>
  )
}
