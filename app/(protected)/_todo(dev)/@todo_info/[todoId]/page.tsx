import React from 'react'
import MouseEventSection from './_components/MouseEventSection'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { IUserSession, meQuery } from '@/services/queries/auth/meQuery'
import { createServerClient } from '@/lib/supabase/server'
import { todoQuery } from '@/services/queries/todo/todoQuery'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import DataAccess from './_components/DataAccess'

interface Props {
  params: { todoId: string }
  searchParams: { folder_id: string }
}

export default async function Page({ params, searchParams }: Props) {
  const todoId = params.todoId
  const folderId = searchParams.folder_id

  const queryClient = getQueryClient()
  const supabase = createServerClient()
  await queryClient.prefetchQuery(meQuery.getUserSession(supabase))
  const res = queryClient.getQueryData<IUserSession>(['me', 'session'])

  if (res) {
    queryClient.prefetchQuery(
      todoQuery.getTodoFromFolder(supabase, res.userId, Number(folderId)),
    )
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="fixed inset-0 z-40">
        <MouseEventSection todoId={todoId} folderId={folderId}>
          <DataAccess todoId={todoId} folderId={folderId} />
        </MouseEventSection>
      </div>
    </HydrationBoundary>
  )
}
