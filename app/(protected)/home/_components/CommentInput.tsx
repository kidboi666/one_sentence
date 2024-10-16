import Avatar from '@/components/shared/Avatar'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import { useInput } from '@/hooks/useInput'
import { supabase } from '@/lib/supabase/client'
import { usePostComment } from '@/services/mutates/comment/usePostComment'
import { meQuery } from '@/services/queries/auth/meQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import { FormEvent } from 'react'

interface Props {
  sentenceId: number
  commentId?: number
}

export default function CommentInput({ sentenceId, commentId }: Props) {
  const [content, onChangeContent, setContent] = useInput('')
  const { data } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, data!.userId),
  )
  const { mutate: postComment, isPending: isPostPending } = usePostComment()

  const handlePostComment = (e: FormEvent) => {
    e.preventDefault()
    postComment(
      {
        email: me!.email!,
        userName: me!.user_name!,
        userId: me!.id!,
        content,
        sentenceId: sentenceId,
        avatarUrl: me!.avatar_url || null,
        commentId: commentId || null,
      },
      {
        onSuccess: () => {
          setContent('')
        },
      },
    )
  }

  return (
    <form onSubmit={handlePostComment} className="mb-2 flex w-full gap-4">
      <Avatar src={me?.avatar_url} size="sm" shadow="sm" />
      <Input
        value={content}
        onChange={onChangeContent}
        dimension="sm"
        placeholder="댓글을 달아주세요."
        className="w-full bg-var-lightgray dark:bg-var-dark"
      />
      <Button
        type="submit"
        disabled={!content}
        isLoading={isPostPending}
        size="sm"
        className="h-full self-end"
      >
        댓글달기
      </Button>
    </form>
  )
}
