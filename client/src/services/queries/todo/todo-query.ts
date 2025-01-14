import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { Tables } from '@/src/types/supabase'

export const todoQuery = {
  getTodoInProgress: (supabase: SupabaseClient, userId?: string) =>
    queryOptions<Tables<'todo'>[]>({
      queryKey: QUERY_KEY.TODO.IN_PROGRESS,
      queryFn: async () => {
        const { data } = await supabase
          .from('todo')
          .select()
          .eq('user_id', userId)
          .is('is_complete', false)

        return data as Tables<'todo'>[]
      },
    }),

  getTodoInCompleted: (supabase: SupabaseClient, userId: string) =>
    queryOptions<Tables<'todo'>[]>({
      queryKey: QUERY_KEY.TODO.COMPLETED,
      queryFn: async () => {
        const { data } = await supabase
          .from('todo')
          .select()
          .eq('user_id', userId)
          .is('is_complete', true)

        return data as Tables<'todo'>[]
      },
    }),

  getTodoFromFolder: (
    supabase: SupabaseClient,
    userId: string,
    folderId: number,
  ) =>
    queryOptions<Tables<'todo'>[]>({
      queryKey: QUERY_KEY.TODO.FOLDER(folderId),
      queryFn: async () => {
        let myTodo
        const { data } = await supabase
          .from('todo')
          .select()
          .eq('user_id', userId)

        if (data) {
          myTodo = data.filter(
            (todoFolder: Tables<'todo'>) => todoFolder.folder_id === folderId,
          )
        }
        return myTodo || []
      },
    }),

  getTodoIndex: (supabase: SupabaseClient, userId: string, folderId: number) =>
    queryOptions({
      queryKey: QUERY_KEY.TODO.INDEX(folderId),
      queryFn: async () => {
        const { data } = await supabase
          .from('todo')
          .select()
          .eq('user_id', userId)
      },
    }),
}
