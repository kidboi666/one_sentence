import { Suspense, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import useFavoriteComment from '@/services/mutates/comment/useFavoriteComment'
import { commentQuery } from '@/services/queries/comment/commentQuery'
import { Tables } from '@/types/supabase'
import { formatDateToHM, formatDateToYMD } from '@/utils/formatDate'
import Avatar from '@/components/feature/user/Avatar'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import CommentInput from './CommentInput'
import Spinner from '@/components/shared/Spinner'
import { meQuery } from '@/services/queries/auth/meQuery'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { ISessionInfo } from '@/types/auth'
import CommentInputButton from '../button/CommentInputButton'
import CommentButton from '../button/CommentButton'
import FavoriteButton from '../button/FavoriteButton'

interface Props {
  comment: Tables<'comment'>
  sentenceId: number
}

export default function CommentItem({ comment, sentenceId }: Props) {
  const cachedMe = getQueryClient().getQueryData<ISessionInfo>([
    'me',
    'session',
  ])
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, cachedMe!.userId),
  )
  const [showComment, setShowComment] = useState(false)
  const [showCommentInput, setShowCommentInput] = useState(false)
  const { data: commentToComments } = useSuspenseQuery(
    commentQuery.getCommentToComment(supabase, sentenceId, comment?.id),
  )
  const { mutate: favoriteComment } = useFavoriteComment()

  const handleShowComment = () => {
    setShowComment((prev) => !prev)
  }

  const handleShowCommentInput = () => {
    setShowCommentInput((prev) => !prev)
  }

  const handleFavoriteComment = (commentId: number) => {
    favoriteComment({ commentId, userId: me?.id!, sentenceId })
  }

  return (
    <div className="flex w-full gap-2">
      <Avatar src={comment?.avatar_url} size="sm" shadow="sm" />
      <div className="flex flex-1 flex-col gap-2">
        <div>
          <Title size="xs" type="sub">
            {comment.user_name}
            <Text as="span" type="caption" size="sm">
              {' '}
              님의 댓글
            </Text>
          </Title>
          <Text type="caption" size="sm">
            {formatDateToYMD(comment.created_at)}
            {' ・ '}
            {formatDateToHM(comment.created_at)}
          </Text>
        </div>
        <div className="w-fit rounded-md bg-white p-2 dark:bg-var-darkgray">
          <Text>{comment.content}</Text>
        </div>
        <div className="flex flex-1">
          <FavoriteButton
            item={comment}
            onFavorite={handleFavoriteComment}
            userId={me?.id!}
          />
          {commentToComments.length >= 1 && (
            <CommentButton
              showComment={showComment}
              onShowComment={handleShowComment}
              commentCount={comment.comment ?? 0}
            />
          )}
          <CommentInputButton onShowCommentInput={handleShowCommentInput} />
        </div>
        {showCommentInput && (
          <CommentInput sentenceId={sentenceId} commentId={comment.id} />
        )}
        {showComment &&
          commentToComments.length >= 1 &&
          commentToComments.map((comment) => (
            <Suspense key={comment.id} fallback={<Spinner size={40} />}>
              <CommentItem sentenceId={sentenceId} comment={comment} />
            </Suspense>
          ))}
      </div>
    </div>
  )
}