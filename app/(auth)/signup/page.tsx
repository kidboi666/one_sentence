'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema } from '@/lib/validators/auth'
import { ISignUp } from '@/types/auth'
import Title from '@/components/shared/Title'
import Button from '@/components/shared/Button'
import AuthForm from '../_components/AuthForm'
import useSignUp from '@/services/mutates/auth/useSignUp'
import LinkButton from '@/components/shared/LinkButton'
import { useSignInOAuth } from '@/services/mutates/auth/useSignInOAuth'
import Icon from '@/components/shared/Icon'

export default function SignUpPage() {
  const { mutate: signUp, isPending, isSuccess } = useSignUp()
  const { mutate: signUpOAuth } = useSignInOAuth()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const handleSubmitSignUp = async (data: ISignUp) => {
    signUp(data, {
      onError: (error) => {
        setError('email', {
          type: 'validate',
          message: error.message,
        })
      },
    })
  }

  const handleSubmitOAuthSignUp = () => {
    signUpOAuth()
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSignUp)}
      className="flex w-full flex-col gap-4 md:w-96"
    >
      <Title>회원가입</Title>
      <AuthForm
        register={register('email')}
        error={errors.email}
        type="email"
        name="이메일"
      />
      <AuthForm
        register={register('nickname')}
        error={errors.nickname}
        type="nickname"
        name="필명"
      />
      <AuthForm
        register={register('password')}
        error={errors.password}
        type="password"
        name="비밀번호"
      />
      <AuthForm
        register={register('passwordConfirmation')}
        error={errors.passwordConfirmation}
        type="password"
        name="비밀번호 확인"
      />
      <LinkButton
        href="/signin"
        size="sm"
        variant="teritory"
        className="w-fit self-end"
      >
        로그인하러 가기
      </LinkButton>
      <Button
        isLoading={isPending || isSuccess}
        disabled={isSuccess}
        type="submit"
      >
        회원가입
      </Button>{' '}
      <Button
        onClick={handleSubmitOAuthSignUp}
        className="bg-var-yellow text-white"
      >
        <Icon size={20}>
          <path
            d="M11.6144 3C6.30451 3 2 6.48454 2 10.7831C2 13.5255 3.75623 15.9314 6.4034 17.3177L5.38748 20.7042C5.32567 20.9098 5.55504 21.0797 5.7336 20.9606L9.58943 18.3899C10.2428 18.5035 10.9194 18.5662 11.6144 18.5662C16.9243 18.5662 21.2288 15.0816 21.2288 10.7831C21.2288 6.48454 16.9243 3 11.6144 3Z"
            fill="currentColor"
          />
        </Icon>{' '}
        카카오로 가입
      </Button>
    </form>
  )
}
