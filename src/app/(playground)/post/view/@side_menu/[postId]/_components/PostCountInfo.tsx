'use client'

import LikeButton from '@/src/app/(playground)/(home)/_components/LikeButton'
import CommentButton from '@/src/app/(playground)/(home)/_components/CommentButton'
import { useSuspenseQuery } from '@tanstack/react-query'
import { postQuery } from '@/src/services/queries/post/post-query'
import { supabase } from '@/src/lib/supabase/client'

interface Props {
  postId: number
}

export default function PostCountInfo({ postId }: Props) {
  const { data: post } = useSuspenseQuery(postQuery.getPost(supabase, postId))

  return (
    <>
      <LikeButton
        likeCount={post.like_count[0].count}
        isLiked={post.is_liked.length > 0}
        postId={postId}
        viewToolTip
        isSide
      />
      <CommentButton
        commentCount={post.comment_count[0].count}
        viewToolTip
        isSide
      />
    </>
  )
}