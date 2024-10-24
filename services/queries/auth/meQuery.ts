import { Tables } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export interface IUserSession {
  about_me: string
  avatar_url: string | null
  email: string
  email_verified: boolean
  user_name: string
  phone_verified: boolean
  sub: string
  userId: string
}

export const meQuery = {
  getUserSession: (supabase: SupabaseClient) =>
    queryOptions<IUserSession | null>({
      queryKey: ['me', 'session'],
      queryFn: async () => {
        const { data, error } = await supabase.auth.getUser()

        if (error) {
          return null
        }

        return {
          ...data.user?.user_metadata,
          userId: data.user?.id,
        } as IUserSession
      },
    }),
  getUserInfo: (supabase: SupabaseClient, userId?: string) =>
    queryOptions<Tables<'user_info'>>({
      queryKey: ['me', 'info'],
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
