import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export const emotionQuery = {
  getEmotionAverage: (supabase: SupabaseClient, userId: string) =>
    queryOptions({
      queryKey: ['user_emotion_average'],
      queryFn: async () => {
        const { data } = await supabase
          .from('sentence')
          .select('emotion_level')
          .eq('user_id', userId)
        let result

        if (data) {
          const splitArray = data.map((item) =>
            Number(item.emotion_level.split('%')[0]),
          )
          const sum = splitArray.reduce((prev, curr) => prev + curr)
          result = Math.floor(sum / splitArray.length + 1)
        } else {
          result = '???'
        }

        return result
      },
    }),

  getMonthEmotionAverage: (
    supabase: SupabaseClient,
    userId: string,
    date: string,
  ) =>
    queryOptions({
      queryKey: ['user_emotion', date],
      queryFn: async () => {
        const { data } = await supabase
          .from('sentence')
          .select('emotion_level')
          .rangeGt('created_at', date)
          .eq('user_id', userId)
      },
    }),
}
