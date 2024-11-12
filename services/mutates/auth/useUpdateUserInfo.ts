import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { IUpdateUserInfo } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { routes } from '@/routes'
import { queryKey } from '@/lib/tanstack/query-key'

export default function useUpdateUserInfo() {
  const queryClient = getQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async (params: IUpdateUserInfo) => {
      const { data, error } = await supabase
        .from('user_info')
        .update({
          about_me: params.aboutMe,
          avatar_url: params.avatarUrl,
          user_name: params.userName,
          mbti: params.mbti,
        })
        .eq('id', params.userId)

      if (error) {
        throw error
      }

      return data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.auth.info })
      queryClient.invalidateQueries({ queryKey: queryKey.auth.session })
      router.replace(routes.modal.success)
    },
    onError: (error) => {
      console.log('에러발생', error)
    },
  })
}
