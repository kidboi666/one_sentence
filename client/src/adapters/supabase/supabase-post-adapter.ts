import { SupabaseTransformer } from '@/src/adapters/supabase/supabase-transformer'
import { SUPABASE_QUERY } from '@/src/constants'
import { PostgrestError, SupabaseClient } from '@supabase/supabase-js'
import { AccessType } from '@/src/types/enums'
import {
  ICreatePost,
  IGetAllPosts,
  IGetAllUserPosts,
  IGetLikedPosts,
  IGetPost,
  IGetUserPostsThatDay,
  ILikedPost,
  IPost,
  IPostBaseAdapter,
  IPostDetail,
  ISupabasePost,
  IUpdatePost,
} from '@/src/types/post'
import { APIError } from '@/src/utils/fetcher'

export class SupabasePostAdapter
  extends SupabaseTransformer
  implements IPostBaseAdapter
{
  constructor(private readonly supabase: SupabaseClient) {
    super()
  }

  async getAllPosts(params: IGetAllPosts) {
    let query = this.supabase
      .from('post')
      .select<string, IPost>(SUPABASE_QUERY.GET_POSTS_WITH_AUTHOR_INFO)
      .eq('access_type', AccessType.PUBLIC)
      .order('created_at', { ascending: false })
      .range(params.pageParam, params.pageParam + params.limit - 1)

    query = this.addUserFilter(query, undefined, params.meId)
    const { data, error } = await query
    this.handleError(error)
    return this.transformResponse(data ?? [])
  }

  async getLikedPosts(params: IGetLikedPosts) {
    let query = this.supabase
      .from('like')
      .select<string, ILikedPost>(
        SUPABASE_QUERY.GET_LIKED_POSTS_WITH_AUTHOR_INFO,
      )
      .order('created_at', { ascending: false })
      .range(params.pageParam, params.pageParam + params.limit - 1)

    query = this.addUserFilter(query, params.authorId, params.meId)
    const { data, error } = await query
    this.handleError(error)
    const isMe = this.isCurrentUserAuthor(params.authorId, params.meId)
    const filteredPosts = this.filterPrivateLikedPosts(data, isMe)
    return this.transformResponse(filteredPosts ?? [])
  }

  async getPost(params: IGetPost): Promise<IPostDetail | null> {
    let query = this.supabase
      .from('post')
      .select<
        string,
        IPostDetail
      >(SUPABASE_QUERY.GET_POST_DETAIL_WITH_AUTHOR_INFO_AND_COMMENTS)
      .eq('id', params.postId)
      .single()

    query = this.addUserFilter(query, undefined, params.meId)
    const { data, error } = await query
    this.handleError(error)

    return this.transformResponse(data)
  }

  async getUserPostsThatDay(params: IGetUserPostsThatDay) {
    let query = this.supabase
      .from('post')
      .select<string, IPost>(SUPABASE_QUERY.GET_POSTS_WITH_AUTHOR_INFO)
      .gte('created_at', params.startOfDay)
      .lte('created_at', params.endOfDay)
      .eq('like.user_id', params.authorId)
      .order('created_at', { ascending: false })

    query = this.addUserFilter(query, params.authorId, params.meId)
    const { data, error } = await query
    this.handleError(error)
    const isMe = this.isCurrentUserAuthor(params.authorId, params.meId)
    const filteredPosts = this.filterPrivatePosts(data as ISupabasePost[], isMe)

    return this.transformResponse(filteredPosts ?? [])
  }

  async getUserPosts(params: IGetAllUserPosts) {
    let query = this.supabase
      .from('post')
      .select<string, IPost>(SUPABASE_QUERY.GET_POSTS_WITH_AUTHOR_INFO)
      .eq('post_type', params.postType)
      .order('created_at', { ascending: false })
      .range(params.pageParam, params.pageParam + params.limit - 1)

    query = this.addUserFilter(query, params.authorId, params.meId)
    const { data, error } = await query
    this.handleError(error)
    const isMe = this.isCurrentUserAuthor(params.authorId, params.meId)
    const filteredPosts = this.filterPrivatePosts(data as ISupabasePost[], isMe)

    return this.transformResponse(filteredPosts ?? [])
  }

  async createPost(params: ICreatePost) {
    const { error } = await this.supabase
      .from('post')
      .insert({
        ...params,
        emotion_level: params.emotionLevel,
        access_type: params.accessType,
        post_type: params.postType,
      })
      .select()
    this.handleError(error)
  }

  async deletePost(postId: number) {
    const { error } = await this.supabase.from('post').delete().eq('id', postId)
    this.handleError(error)
  }

  async updatePost(params: IUpdatePost) {
    const { error } = await this.supabase
      .from('post')
      .update({
        ...params,
        emotion_level: params.emotionLevel,
        access_type: params.accessType,
        post_type: params.postType,
      })
      .eq('id', params.id)
    this.handleError(error)
  }

  private addUserFilter(query: any, authorId?: string, meId?: string | null) {
    if (meId) {
      query = query.eq('like.user_id', meId)
    }
    if (authorId) {
      query = query.eq('user_id', authorId)
    }
    return query
  }

  private handleError(error: PostgrestError | null) {
    if (error?.code && error?.message) {
      throw new APIError(error.code, error.message, error)
    }
  }

  private isCurrentUserAuthor(authorId: string, meId?: string | null) {
    return authorId === meId
  }

  private filterPrivateLikedPosts(
    data: ILikedPost[] | null,
    isMe: boolean,
  ): ILikedPost[] {
    if (!data) {
      return []
    }
    return isMe
      ? data
      : data?.map((item) =>
          item.post.accessType === AccessType.PUBLIC
            ? item
            : { ...item, post: { ...item.post, title: null, content: '' } },
        )
  }

  private filterPrivatePosts(data: ISupabasePost[], isMe: boolean): IPost[] {
    if (!data) {
      return []
    }

    return isMe
      ? data
      : data?.map((item) =>
          item.accessType === AccessType.PUBLIC
            ? item
            : { ...item, title: null, content: '' },
        )
  }
}
