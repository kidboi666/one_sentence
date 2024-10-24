'use client'

import { usePathname } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { IFavoriteWord } from '@/types/sentence'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import Empty from '@/components/shared/Empty'
import Title from '@/components/shared/Title'
import { List } from '@/components/shared/List'
import FavoriteWordTag from './FavoriteWordTag'

export default function MyFavoriteWords() {
  const pathname = usePathname()
  const [_, __, userId] = pathname.split('/')
  const { data: words } = useSuspenseQuery(
    sentenceQuery.getMyUsedWords(supabase, userId),
  )
  const typedWords = words?.words as unknown as IFavoriteWord[]
  const sortedUsedWords = typedWords?.sort((a, b) => b?.count - a?.count)
  const shouldRenderWords = sortedUsedWords?.filter((word) => word.count > 1)

  return (
    <>
      <Title>가장 많이 사용하는</Title>
      {shouldRenderWords?.length! >= 1 ? (
        <List className="flex flex-wrap gap-2">
          {shouldRenderWords?.map((word, index) => {
            if (index >= 20) {
              return null
            } else {
              return <FavoriteWordTag key={word.word} word={word} />
            }
          })}
        </List>
      ) : (
        <Empty>아직 자주 사용하는 단어가 없습니다.</Empty>
      )}
    </>
  )
}
