import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import { ComponentProps, forwardRef, PropsWithRef } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

interface Props extends ComponentProps<'input'> {
  className?: string
  variant?: 'primary' | 'secondary' | 'auth' | 'none'
  register?: UseFormRegisterReturn
  error?: FieldError
  dimension?: 'sm' | 'md' | 'lg' | 'none'
  dataStatus?: string
}

const INPUT_VARIANTS = cva('outline-none', {
  variants: {
    variant: {
      primary:
        'rounded-md bg-white shadow-sm ring-zinc-200 transition focus:ring-4 dark:bg-var-darkgray dark:text-white dark:ring-zinc-600',
      secondary:
        'border-var-zinc border-b bg-transparent transition ease-in-out dark:bg-transparent dark:text-white dark:ring-zinc-600',
      auth: 'rounded-md bg-zinc-200 transition dark:bg-white/15 dark:text-white',
      none: '',
    },
    dimension: {
      sm: 'p-2 text-sm',
      md: 'p-4 text-sm',
      lg: 'p-4 text-base',
      none: '',
    },
  },
})

const Input = forwardRef<HTMLInputElement, PropsWithRef<Props>>(
  (
    {
      className,
      register,
      variant = 'primary',
      dimension = 'sm',
      error,
      dataStatus,
      ...props
    },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        data-status={dataStatus}
        className={cn(
          INPUT_VARIANTS({ variant, dimension }),
          error ? 'ring-4 ring-red-500 dark:ring-red-500' : '',
          className,
        )}
        {...register}
        {...props}
      />
    )
  },
)

export default Input
