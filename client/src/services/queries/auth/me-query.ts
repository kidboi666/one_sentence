import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { IUserSession } from '@/src/types/auth'
import { Tables } from '@/src/types/supabase'

export const meQuery = {
  getSession: (supabase: SupabaseClient) =>
    queryOptions<IUserSession>({
      queryKey: QUERY_KEY.AUTH.SESSION,
      queryFn: async () => {
        const { data, error } = await supabase.auth.getUser()

        if (error) {
          return null
        }

        return {
          ...data.user?.user_metadata,
          userId: data.user?.id,
          provider: data.user.app_metadata.provider,
        } as IUserSession
      },
      staleTime: 300000,
    }),

  getUserInfo: (supabase: SupabaseClient, userId?: string) =>
    queryOptions<Tables<'user_info'>>({
      queryKey: QUERY_KEY.AUTH.INFO,
      queryFn: async () => {
        const { data } = await supabase
          .from('user_info')
          .select()
          .eq('id', userId)
          .single()

        return data
      },
      enabled: !!userId,
    }),
}
