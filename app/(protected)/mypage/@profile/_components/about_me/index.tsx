import Box from '@/components/shared/Box'
import Line from '@/components/shared/Line'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import Image from 'next/image'

interface Props {
  avatarUrl: string | null
  userName: string | null
}

export default function AboutMe({ avatarUrl, userName }: Props) {
  return (
    <>
      <Box className="pointer-events-none flex flex-col justify-center gap-4 max-sm:justify-between">
        <Box className="relative overflow-hidden rounded-full border border-gray-400 max-sm:size-52 sm:size-40 dark:border-gray-600">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="프로필 이미지"
              fill
              className="rounded-full border-4 border-gray-50 dark:border"
            />
          ) : (
            <Box className="absolute size-full bg-gray-200" />
          )}
        </Box>
        <Box className="self-end">
          <Title className="text-4xl font-medium">
            <Text as="span" className="mr-2">
              By
            </Text>
            {userName}
          </Title>
        </Box>
      </Box>
      <Box className="relative">
        <Line className="opacity-50" />
        <Text
          as="span"
          type="caption"
          className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-2 text-sm text-gray-400 dark:bg-var-dark"
        >
          소 개
        </Text>
      </Box>
    </>
  )
}