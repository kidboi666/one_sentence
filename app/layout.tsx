import type { Metadata } from 'next'
import ReactQueryProvider from '@/providers/query-client-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'One Sentence',
  description: '하루 한 문장씩 - 홍보 문구 - ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <div id="portal" />
      </body>
    </html>
  )
}
