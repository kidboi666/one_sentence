'use client'

import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren } from 'react'

export default function ReactQueryProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools buttonPosition="bottom-right" />
    </QueryClientProvider>
  )
}
