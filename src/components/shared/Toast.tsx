'use client'

import { ToastContent, useToast } from '@/src/store/useToast'
import Button from './Button'
import Icon from './Icon'
import Text from './Text'
import React, { useEffect, useRef } from 'react'

interface Props {
  content: ToastContent
}

export default function Toast({ content }: Props) {
  const { closeToast } = useToast()
  const toastRef = useRef<HTMLDivElement>(null)

  const handleClose = () => {
    toastRef.current?.setAttribute('data-status', 'closed')
    setTimeout(() => closeToast(content.id), 500)
  }

  useEffect(() => {
    const closeTimeout = setTimeout(() => {
      handleClose()
    }, 3000)

    return () => {
      clearTimeout(closeTimeout)
    }
  }, [content.id, closeToast])

  return (
    <div
      ref={toastRef}
      data-status="opened"
      className="flex w-80 origin-right animate-fade-in items-center justify-between rounded-md bg-white/85 p-4 shadow-lg ring-1 ring-zinc-300 backdrop-blur-md transition duration-300 ease-in-out data-[status=closed]:translate-x-4 data-[status=closed]:opacity-0 dark:bg-zinc-800/85 dark:ring-zinc-700"
    >
      <Text>{content.text}</Text>
      <Button
        variant="icon"
        size="icon"
        onClick={() => {
          setTimeout(() => handleClose())
        }}
        className="p-0"
      >
        <Icon view="0 -960 960 960">
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </Icon>
      </Button>
    </div>
  )
}
