'use client'

import { FormEvent, useEffect, useState } from 'react'
import { BubbleMenu, EditorContent } from '@tiptap/react'
import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

import { postQuery } from '@/services/queries/post/postQuery'
import useUpdatePost from '@/services/mutates/post/useUpdatePost'
import useAddPost from '@/services/mutates/post/useAddPost'
import { meQuery } from '@/services/queries/auth/meQuery'
import useBlockEditor from '@/hooks/useBlockEditor'
import { useInput } from '@/hooks/useInput'
import { TAccess, TEmotion, TPost } from '../page'
import { formatDateToMDY } from '@/utils/formatDate'

import { TagsInput } from '@/components/shared/TagsInput'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import Line from '@/components/shared/Line'
import Avatar from '@/components/shared/Avatar'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { XStack, YStack } from '@/components/shared/Stack'
import EmotionSection from '../_components/EmotionSection'
import PublishSection from '../_components/PublishSection'
import BubbleMenuBar from '../_components/BubbleMenuBar'
import PostTypeSection from '../_components/PostTypeSection'
import { routes } from '@/routes'
import EmotionGauge from '@/app/(playground)/(home)/_components/EmotionGauge'

interface Props {
  searchParams: { post_id: string }
  selectedEmotion: TEmotion
  setSelectedEmotion: (emotio: TEmotion) => void
  accessType: TAccess
  setAccessType: (accessType: TAccess) => void
  postType: TPost
  setPostType: (postType: TPost) => void
}

export default function PostContainer({
  searchParams,
  selectedEmotion,
  setSelectedEmotion,
  accessType,
  setAccessType,
  postType,
  setPostType,
}: Props) {
  const router = useRouter()
  const postId = Number(searchParams?.post_id)
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: post } = useSuspenseQuery(postQuery.getPost(supabase, postId))
  const [content, setContent] = useState(post?.content ?? '')
  const [title, onChangeTitle, setTitle] = useInput<string | null>(null)

  const { editor } = useBlockEditor({
    setContent,
    content,
    editable: true,
    placeholder: '오늘 당신의 생각과 감정을 기록하세요.',
  })
  const [tags, setTags] = useState<string[]>([])
  const { mutate: addPost, isPending, isSuccess } = useAddPost()
  const { mutate: updatePost } = useUpdatePost()

  const handleChangeEmotion = (emotion: TEmotion | null) =>
    setSelectedEmotion(emotion)

  const handleChangeAccessType = (order: TAccess) => setAccessType(order)
  const handleChangePostType = (order: TPost) => setPostType(order)
  const handleInputFocus = () => editor?.commands.focus('end')
  const handleInitPostData = () => {
    setTitle(post.title)
    editor?.commands.setContent(content)
    setPostType(post.post_type)
    setAccessType(post.access_type)
    setSelectedEmotion(post.emotion_level ? post.emotion_level : null)
  }

  const handleSubmitPost = (e: FormEvent) => {
    e.preventDefault()

    const newPost = {
      content,
      emotion_level: postType === 'journal' ? selectedEmotion : null,
      user_id: me!.userId,
      tags,
      title,
      access_type: accessType,
      post_type: postType,
    }

    post
      ? updatePost(
          {
            ...newPost,
            id: post.id,
          },
          {
            onSuccess: () => {
              router.replace(routes.modal.success)
            },
          },
        )
      : addPost(newPost, {
          onSuccess: () => {
            router.replace(routes.modal.success)
          },
        })
  }

  useEffect(() => {
    postType === 'article'
      ? handleChangeEmotion(null)
      : handleChangeEmotion('50%')
  }, [postType])

  useEffect(() => {
    if (post && editor) {
      handleInitPostData()
    }
  }, [post, editor])

  return (
    <form
      onSubmit={handleSubmitPost}
      className="h-fit w-full rounded-md bg-white p-4 shadow-sm dark:bg-var-darkgray"
    >
      <YStack gap={0}>
        <XStack gap={4}>
          <Avatar src={me?.avatar_url} size="sm" ring />
          <YStack gap={0} className="self-end">
            <XStack gap={1} className="items-end">
              <Title size="xs" type="sub">
                {me?.user_name}
              </Title>
              <Text as="span" type="caption" size="sm">
                · @{me?.email?.split('@')[0]}
              </Text>
            </XStack>
            <Text type="caption" size="sm">
              {formatDateToMDY(new Date().getTime())}
            </Text>
          </YStack>
          <XStack className="flex-1 justify-end">
            <EmotionGauge
              emotionLevel={selectedEmotion}
              onClick={handleChangeEmotion}
            />
          </XStack>
        </XStack>
        <Line className="my-4" />
        <Input
          value={title || ''}
          onChange={onChangeTitle}
          disabled={me === null}
          variant="secondary"
          dimension="none"
          className="my-4 w-full overflow-x-auto text-3xl"
          placeholder="제목을 입력해 주세요."
        />
        <YStack gap={0} className="max-h-full cursor-text">
          {editor && (
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <BubbleMenuBar editor={editor} />
            </BubbleMenu>
          )}
          <EditorContent editor={editor} disabled={me === null} />
          <div onClick={handleInputFocus} className="h-20 max-h-full w-full" />
        </YStack>
        <YStack>
          <TagsInput tags={tags} setTags={setTags} disabled={me === null} />
          <XStack className="justify-between">
            <XStack gap={4} className="items-center sm:hidden">
              <PublishSection
                accessType={accessType}
                onChangeAccessType={handleChangeAccessType}
              />
              <PostTypeSection
                postType={postType}
                onChangePostType={handleChangePostType}
              />
              <EmotionSection
                selectedEmotion={selectedEmotion}
                onChangeEmotion={handleChangeEmotion}
              />
            </XStack>
            <XStack className="flex-1 justify-end">
              <Button
                isLoading={isPending}
                disabled={
                  editor?.storage.characterCount.characters() === 0 ||
                  tags.length > 10 ||
                  isSuccess
                }
                type="submit"
                size="sm"
              >
                등록하기
              </Button>
            </XStack>
          </XStack>
        </YStack>
      </YStack>
    </form>
  )
}
