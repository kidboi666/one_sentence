'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema } from '@/lib/validators/auth'
import { ISignIn } from '@/types/auth'
import AuthForm from '../_components/AuthForm'
import Title from '@/components/shared/Title'
import Button from '@/components/shared/Button'

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmitSignIn = async (authData: ISignIn) => {}

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSignIn)}
      className="flex w-96 flex-col gap-2"
    >
      <Title>로그인</Title>
      <AuthForm
        register={register('email')}
        error={errors.email}
        type="email"
        name="이메일"
      />
      <AuthForm
        register={register('password')}
        error={errors.password}
        type="password"
        name="비밀번호"
      />
      <Button>로그인</Button>
    </form>
  )
}
