import { QUERY_CONFIG } from '@/src/config/index'
import { QueryClient, isServer } from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient(QUERY_CONFIG)
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new queries client
    return makeQueryClient()
  } else {
    // Browser: make a new queries client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the queries client
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
