import { Tables } from '@/types/supabase'
import { queryOptions } from '@tanstack/react-query'

export const commentQuery = {
  getComment: (supabase: any, sentenceId: number) =>
    queryOptions<Tables<'comment'>[]>({
      queryKey: ['comment', sentenceId],
      queryFn: async () => {
        const { data } = await supabase
          .from('comment')
          .select()
          .eq('sentence_id', sentenceId)
          .is('comment_id', null)

        return data
      },
      enabled: !!sentenceId,
    }),

  getCommentToComment: (supabase: any, sentenceId: number, commentId: number) =>
    queryOptions<Tables<'comment'>[]>({
      queryKey: ['comment', sentenceId, commentId],
      queryFn: async () => {
        const { data } = await supabase
          .from('comment')
          .select()
          .eq('comment_id', commentId)
          .order('created_at', { ascending: false })

        return data
      },
      enabled: !!commentId,
    }),
}
