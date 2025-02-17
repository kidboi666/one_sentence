import { createUserServerAdapter } from '@/src/adapters/create-server-adapter'
import { PropsWithChildren, ReactNode } from 'react'
import { YStack, ZStack } from '@/src/components/Stack'
import MenuSection from '@/src/app/(playground)/profile/view/[userId]/@user_info/journal_garden/_components/MenuSection'

interface Props {
  user_info: ReactNode
  params: { userId: string }
}

export async function generateMetadata({ params: { userId } }: Props) {
  const userServerAdapter = await createUserServerAdapter()
  const userInfo = await userServerAdapter.getUserInfo(userId)
  return {
    title: `${userInfo?.userName}`,
  }
}

export default function UserLayout({
  params: { userId },
  user_info,
}: PropsWithChildren<Props>) {
  return (
    <YStack gap={8} className="animate-fade-in">
      <div className="overflow-x-auto rounded-md bg-white p-1 shadow-sm dark:bg-var-darkgray">
        <ZStack gap={2}>
          <MenuSection userId={userId} />
        </ZStack>
      </div>
      {user_info}
    </YStack>
  )
}
