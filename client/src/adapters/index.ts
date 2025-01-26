import { NestAuthAdapter } from '@/src/adapters/nest/nest-auth-adapter'
import { NestPostAdapter } from '@/src/adapters/nest/nest-post-adapter'
import { NestTodoAdapter } from '@/src/adapters/nest/nest-todo-adapter'
import { NestWordAdapter } from '@/src/adapters/nest/nest-word-adapter'
import { SupabaseAuthAdapter } from '@/src/adapters/supabase/supabase-auth-adapter'
import { SupabasePostAdapter } from '@/src/adapters/supabase/supabase-post-adapter'
import { SupabaseTodoAdapter } from '@/src/adapters/supabase/supabase-todo-adapter'
import { SupabaseWordAdapter } from '@/src/adapters/supabase/supabase-word-adapter'
import { SupabaseClient } from '@supabase/supabase-js'
import { IAuthBaseAdapter } from '@/src/types/auth'
import { Provider } from '@/src/types/enums'
import { IPostBaseAdapter } from '@/src/types/post'
import { ITodoBaseAdapter } from '@/src/types/todo'
import { IWordBaseAdapter } from '@/src/types/word'

export const databaseProvider =
  (process.env.NEXT_PUBLIC_DB_PROVIDER as Provider) ?? Provider.SUPABASE

const createAdapter = <T>(
  provider: Provider,
  client: SupabaseClient | undefined,
  supabaseCallback: (client: SupabaseClient) => T,
  nestCallback: () => T,
): T => {
  if (provider === Provider.SUPABASE && client) {
    return supabaseCallback(client)
  }
  return nestCallback()
}

export function createAuthAdapter(
  supabaseClient?: SupabaseClient,
): IAuthBaseAdapter {
  return createAdapter<IAuthBaseAdapter>(
    databaseProvider,
    supabaseClient,
    (client) => new SupabaseAuthAdapter(client),
    () => new NestAuthAdapter(),
  )
}

export function createPostAdapter(
  supabaseClient?: SupabaseClient,
): IPostBaseAdapter {
  return createAdapter<IPostBaseAdapter>(
    databaseProvider,
    supabaseClient,
    (client) => new SupabasePostAdapter(client),
    () => new NestPostAdapter(),
  )
}

export function createWordAdapter(
  supabaseClient?: SupabaseClient,
): IWordBaseAdapter {
  return createAdapter<IWordBaseAdapter>(
    databaseProvider,
    supabaseClient,
    (client) => new SupabaseWordAdapter(client),
    () => new NestWordAdapter(),
  )
}

export function createTodoAdapter(
  supabaseClient?: SupabaseClient,
): ITodoBaseAdapter {
  return createAdapter(
    databaseProvider,
    supabaseClient,
    (client) => new SupabaseTodoAdapter(client),
    () => new NestTodoAdapter(),
  )
}
