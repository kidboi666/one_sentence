'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

import { meQuery } from '@/services/queries/auth/meQuery'
import useUploadAvatarImage from '@/services/mutates/auth/useUploadAvatarImage'
import useUpdateUserInfo from '@/services/mutates/auth/useUpdateUserInfo'
import { useInput } from '@/hooks/useInput'

import FormContainer from '@/components/shared/FormContainer'
import IntroduceSection from './_components/IntroduceSection'
import ChallangeSection from './_components/ChallangeSection'
import SubmitButtonSection from './_components/SubmitButtonSection'
import AboutMeSection from './_components/AboutMeSection'

export default function EditProfilePage() {
  const { data } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, data?.userId),
  )
  const [userName, onChangeUserName, setUserName] = useInput<string | null>('')
  const [aboutMe, onChangeAboutMe, setAboutMe] = useInput<string | null>('')
  const [avatarUrl, , setAvatarUrl] = useInput<string | null>('')
  const [image, setImage] = useState<File | null>(null)
  const { mutate: updateProfile, isPending } = useUpdateUserInfo()
  const { mutateAsync: uploadImage, isPending: isPendingImageUpload } =
    useUploadAvatarImage()

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setAvatarUrl(URL.createObjectURL(file))
    }
  }

  const handleProfileUpdateWithImage = () => {
    uploadImage(
      { email: me.email, image },
      {
        onSuccess: (data) => {
          updateProfile({
            userId: me.id,
            aboutMe,
            avatarUrl: data,
            userName,
          })
        },
      },
    )
  }

  const handleProfileUpdateWithoutImage = () => {
    updateProfile({
      userId: me.id,
      aboutMe,
      userName,
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
    setUserName(me?.user_name)
    setAboutMe(me?.about_me)
    setAvatarUrl(me?.avatar_url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me?.avatar_url, me?.user_name, me?.about_me])

  return (
    <FormContainer
      onSubmit={handleProfileUpdate}
      className="flex w-full flex-col justify-center gap-12 md:max-w-[768px]"
    >
      <AboutMeSection
        avatarUrl={avatarUrl}
        userName={userName}
        onChangeImage={handleChangeImage}
        onChangeUserName={onChangeUserName}
      />
      <IntroduceSection value={aboutMe ?? ''} onChange={onChangeAboutMe} />
      <ChallangeSection />
      <SubmitButtonSection
        isPending={isPendingImageUpload || isPending}
        disabled={
          userName === me?.user_name &&
          aboutMe === me?.about_me &&
          avatarUrl === me?.avatar_url
        }
      />
    </FormContainer>
  )
}
