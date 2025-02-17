'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import useDeletePost from '@/src/services/mutates/post/use-delete-post'
import { ROUTES } from '@/src/routes'
import Button from '@/src/components/Button'
import Modal from '@/src/components/Modal'
import { XStack } from '@/src/components/Stack'
import Title from '@/src/components/Title'

interface Props {
  params: { postId: string }
}

export default function DeletePostModal({ params }: Props) {
  const router = useRouter()
  const { mutate: deletePost } = useDeletePost()
  const [isLoading, startTransition] = useTransition()

  const handlePostDelete = () => {
    startTransition(() =>
      deletePost(Number(params.postId), {
        onSettled: () => router.push(ROUTES.HOME),
      }),
    )
  }

  return (
    <Modal>
      <Title>정말 게시물을 삭제하시겠습니까?</Title>
      <XStack>
        <Button
          variant="secondary"
          disabled={isLoading}
          onClick={() => router.back()}
        >
          취소하기
        </Button>
        <Button onClick={handlePostDelete} isLoading={isLoading}>
          삭제하기
        </Button>
      </XStack>
    </Modal>
  )
}
