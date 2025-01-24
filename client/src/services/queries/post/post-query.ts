import { createPostAdapter } from '@/src/adapters'
import { SupabaseClient } from '@supabase/supabase-js'
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { PostType } from '@/src/types/enums'
import { ILikedPost, IPost } from '@/src/types/post'
import { APIError } from '@/src/utils/fetcher'

export const postQuery = {
  getAllPost: (supabase: SupabaseClient, limit: number, meId?: string | null) =>
    infiniteQueryOptions<IPost[], APIError, IPost[], string[], number>({
      queryKey: QUERY_KEY.POST.PUBLIC,
      queryFn: ({ pageParam = 0 }) => {
        const adapter = createPostAdapter(supabase)
        return adapter.getAllPosts({ pageParam, limit, meId })
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length < limit) {
          return undefined
        }
        return allPages.length * limit
      },
    }),

  getLikedPost: (
    supabase: SupabaseClient,
    authorId: string,
    limit: number,
    meId?: string | null,
  ) =>
    infiniteQueryOptions<
      ILikedPost[],
      APIError,
      ILikedPost[],
      (string | null | undefined)[],
      number
    >({
      queryKey: QUERY_KEY.POST.LIKED(authorId, meId),
      queryFn: ({ pageParam = 0 }) => {
        const adapter = createPostAdapter(supabase)
        return adapter.getLikedPosts({ pageParam, limit, authorId, meId })
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length < limit) {
          return undefined
        }
        return allPages.length * limit
      },
    }),

  getPost: (supabase: SupabaseClient, postId: number, meId?: string | null) =>
    queryOptions<IPost, APIError>({
      queryKey: QUERY_KEY.POST.DETAIL(postId),
      queryFn: () => {
        const adapter = createPostAdapter(supabase)
        return adapter.getPost({ postId, meId })
      },
    }),

  getUserPostThatDay: (
    supabase: SupabaseClient,
    authorId: string,
    startOfDay: string | null,
    endOfDay: string | null,
    meId?: string,
  ) =>
    queryOptions<IPost[], APIError>({
      queryKey: QUERY_KEY.POST.THAT_DAY(startOfDay, endOfDay, authorId),
      queryFn: () => {
        const adapter = createPostAdapter(supabase)
        return adapter.getUserPostThatDay({
          authorId,
          startOfDay,
          endOfDay,
          meId,
        })
      },
      enabled: !!startOfDay && !!endOfDay,
    }),

  getAllUserPost: (
    supabase: SupabaseClient,
    authorId: string,
    postType: PostType,
    limit: number,
    meId?: string | null,
  ) =>
    infiniteQueryOptions<
      IPost[],
      APIError,
      IPost[],
      (string | null | undefined)[],
      number
    >({
      queryKey: QUERY_KEY.POST.POST_TYPE(postType, authorId),
      queryFn: async ({ pageParam = 0 }) => {
        const adapter = createPostAdapter(supabase)
        return adapter.getAllUserPosts({
          pageParam,
          authorId,
          postType,
          limit,
          meId,
        })
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length < limit) {
          return undefined
        }
        return allPages.length * limit
      },
    }),
}
