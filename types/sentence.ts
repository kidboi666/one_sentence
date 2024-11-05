import { Tables } from './supabase'

export interface IFavoriteWord {
  word: string
  count: number
}

export interface ISentenceWithUserInfo
  extends Omit<
    Tables<'sentence'>,
    'post_type' | 'access_type' | 'emotion_level'
  > {
  user_info: Pick<
    Tables<'user_info'>,
    'user_name' | 'email' | 'avatar_url' | 'about_me'
  >
  post_type: 'article' | 'journal'
  access_type: 'public' | 'private'
  emotion_level: '0%' | '25%' | '50%' | '75%' | '100%' | null
}

export interface ISentenceInfiniteQuery {
  pages: Tables<'sentence'>[]
  pageParams: number
}
