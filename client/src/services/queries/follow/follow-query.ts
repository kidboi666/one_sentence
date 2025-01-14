import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { TFollower } from '@/src/types/follow'

export const followQuery = {
  /** 유저를 팔로우하는 유저의 Id들 */
  getFollower: (supabase: SupabaseClient, userId?: string) =>
    queryOptions<TFollower[]>({
      queryKey: QUERY_KEY.FOLLOW.FOLLOWER(userId),
      queryFn: async () => {
        const { data, error } = await supabase
          .from('follow')
          .select(
            `*,
            user_info!follow_follower_user_id_fkey(*)
            `,
          )
          .eq('followed_user_id', userId)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('팔로워 목록 조회 실패:', error)
          throw error
        }

        return data
      },
      enabled: !!userId,
    }),

  /** 유저가 팔로우하는 유저의 Id들 */
  getFollowing: (supabase: SupabaseClient, userId?: string) =>
    queryOptions<TFollower[]>({
      queryKey: QUERY_KEY.FOLLOW.FOLLOWING(userId),
      queryFn: async () => {
        const { data, error } = await supabase
          .from('follow')
          .select(
            `*,
            user_info!follow_followed_user_id_fkey(*)
            `,
          )
          .eq('follower_user_id', userId)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('팔로잉 목록 조회 실패:', error)
          throw error
        }

        return data
      },
      enabled: !!userId,
    }),
}
