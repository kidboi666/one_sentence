'use client'

import { Tables } from '@/src/types/supabase'
import { formatDateToHM, formatDateToMDY } from '@/src/utils/formatDate'
import Text from '@/src/components/Text'
import Title from '@/src/components/Title'

interface Props {
  todo?: Tables<'todo'>
}

export default function DateSection({ todo }: Props) {
  const createdAt = todo?.created_at
  const updatedAt = todo?.updated_at || null

  return (
    <>
      <Title size="xs">등록일</Title>
      <Text type="caption">
        {formatDateToMDY(createdAt!)}년 {formatDateToHM(createdAt!)}
      </Text>
      {updatedAt && (
        <>
          <Title size="xs">최종 수정일</Title>
          <Text type="caption">
            {formatDateToMDY(updatedAt)}년 {formatDateToHM(updatedAt)}
          </Text>
        </>
      )}
    </>
  )
}
