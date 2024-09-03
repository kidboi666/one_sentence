'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'

import { meQuery } from '@/services/queries/auth/meQuery'
import useUploadAvatarImage from '@/services/mutates/auth/useUploadAvatarImage'
import useUpdateUserInfo from '@/services/mutates/auth/useUpdateUserInfo'
import { useInput } from '@/hooks/useInput'

import Button from '@/components/shared/Button'
import NickNameSection from './_components/NickNameSection'
import IntroduceSection from './_components/IntroduceSection'
import ChallangeSection from './_components/ChallangeSection'
import ProfileImageSection from './_components/ProfileImageSection'
import { supabase } from '@/lib/supabase/client'

export default function EditProfilePage() {
  const { data } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, data?.sub),
  )
  const [nickname, onChangeNickName, setNickname] = useInput<string | null>('')
  const [aboutMe, onChangeAboutMe, setAboutMe] = useInput<string | null>('')
  const [avatarUrl, , setAvatarUrl] = useInput<string | null>('')
  const [image, setImage] = useState<File | null>(null)
  const { mutate: updateProfile, isPending } = useUpdateUserInfo()
  const { mutateAsync: uploadImage, isPending: isPendingImageUpload } =
    useUploadAvatarImage()

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setAvatarUrl(URL.createObjectURL(file))
    }
  }

  const handleProfileUpdateWithImage = () => {
    uploadImage(
      { userId: me.id, image },
      {
        onSuccess: (data) => {
          updateProfile({
            userId: me.id,
            aboutMe,
            avatarUrl: data,
            nickname,
          })
        },
      },
    )
  }

  const handleProfileUpdateWithoutImage = () => {
    updateProfile({
      userId: me.id,
      aboutMe,
      nickname,
    })
  }

  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault()
    if (image) {
      handleProfileUpdateWithImage()
    } else {
      handleProfileUpdateWithoutImage()
    }
  }

  useEffect(() => {
    setNickname(me?.nickname)
    setAboutMe(me?.about_me)
    setAvatarUrl(me?.avatar_url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me?.avatar_url, me?.nickname, me?.about_me])

  return (
    <form
      onSubmit={handleProfileUpdate}
      className="mt-20 flex w-full animate-fade-in flex-col justify-center gap-8 px-2 md:max-w-[768px] md:flex-row"
    >
      <ProfileImageSection
        onChange={handleImageChange}
        imagePreview={avatarUrl}
      />
      <div className="flex w-full flex-col gap-12">
        <div className="flex w-full max-w-52 flex-col gap-8">
          <NickNameSection value={nickname ?? ''} onChange={onChangeNickName} />
        </div>
        <div className="flex w-full flex-col gap-8">
          <IntroduceSection value={aboutMe ?? ''} onChange={onChangeAboutMe} />
        </div>
        <ChallangeSection />
        <Button
          type="submit"
          isLoading={isPendingImageUpload || isPending}
          disabled={
            nickname === me?.nickname &&
            aboutMe === me?.about_me &&
            avatarUrl === me?.avatar_url
          }
        >
          수정하기
        </Button>
      </div>
    </form>
  )
}
