import { useRouter } from 'next/navigation'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

import useBlockEditor from '@/hooks/useBlockEditor'
import { followQuery } from '@/services/queries/follow/followQuery'

import PostContent from './PostContent'
import { YStack } from '@/components/shared/Stack'
import { countFollowQuery } from '@/services/queries/follow/countFollowQuery'
import useUnlikePost from '@/services/mutates/post/useUnlikePost'
import { postQuery } from '@/services/queries/post/postQuery'
import { TEmotion } from '../../post/edit/page'
import { MouseEvent } from 'react'
import { countCommentQuery } from '@/services/queries/comment/countCommentQuery'
import { IUserSession } from '@/services/queries/auth/meQuery'
import { routes } from '@/routes'
import { IPostWithUserInfo } from '@/types/post'
import { IPostState } from '@/store/usePost'
import useLikepost from '@/services/mutates/post/useLikePost'
import PostHeader from './PostHeader'

interface Props {
  post?: IPostWithUserInfo
  postUserInfo?: any
  postSummary?: IPostState
  createdAtLiked?: string
  meId?: string | null
  session?: IUserSession | null
  disabled?: boolean
}

export default function PostCard({
  post,
  postUserInfo,
  createdAtLiked,
  meId,
  session,
  disabled,
}: Props) {
  const router = useRouter()
  const postId = Number(post?.id)
  const content = post?.content
  const tags = post?.tags || []
  const { data: followingCount } = useSuspenseQuery(
    countFollowQuery.countFollowing(supabase, post?.user_id),
  )
  const { data: followerCount } = useSuspenseQuery(
    countFollowQuery.countFollower(supabase, post?.user_id),
  )
  const { data: commentCount } = useSuspenseQuery(
    countCommentQuery.countCommentFromPost(supabase, post?.id),
  )
  const { data: followers } = useSuspenseQuery(
    followQuery.getFollower(supabase, post?.user_id),
  )
  const { data: isLiked } = useQuery(
    postQuery.checkLiked(supabase, postId, meId),
  )
  const { editor } = useBlockEditor({
    content,
  })
  const isFollowing = followers?.find((user) => user.follower_user_id === meId)

  const { mutate: like } = useLikepost()
  const { mutate: unlike } = useUnlikePost()

  const handleLike = () => {
    isLiked
      ? unlike({ meId, postId, postType: post?.post_type })
      : like({
          meId,
          postId,
          postType: post?.post_type,
        })
  }

  const handleLikePost = (e: MouseEvent) => {
    e.stopPropagation()
    session
      ? handleLike()
      : router.push(routes.modal.auth.guard, { scroll: false })
  }

  const handlePostItemClick = () => {
    router.push(routes.post.view(postId))
  }

  if (!editor) return null

  return (
    <YStack>
      {post ? (
        <PostHeader
          userId={post.user_id}
          isMe={meId === post.user_id}
          isFollowing={!!isFollowing}
          followerCount={followerCount}
          followingCount={followingCount}
          createdAtLiked={createdAtLiked}
          postType={post.post_type}
          email={postUserInfo.email}
          avatarUrl={postUserInfo.avatar_url}
          userName={postUserInfo.user_name}
          emotionLevel={post.emotion_level as TEmotion}
          createdAt={post.created_at}
        />
      ) : null}
      <PostContent
        tags={tags}
        editor={editor}
        postTitle={post?.title}
        accessType={post?.access_type}
        likedCount={post?.like?.[0].count}
        isLiked={isLiked}
        commentCount={commentCount || 0}
        postUserId={post?.user_id}
        postId={postId}
        onLike={handleLikePost}
        onClick={handlePostItemClick}
        meId={meId}
        disabled={disabled}
      />
    </YStack>
  )
}
