import type { Metadata } from 'next'
import './globals.css'
import ReactQueryProvider from '@/store/context/query-client-provider'
import ThemeProvider from '@/store/context/theme-provider'
import Portal from '@/components/shared/Portal'

export const metadata: Metadata = {
  title: 'One Sentence',
  description: '하루 한 문장씩 - 홍보 문구 - ',
}

export default function RootLayout({
  children,
  modals,
}: Readonly<{
  children: React.ReactNode
  modals: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <ThemeProvider>
        <body className="hidden bg-var-lightgray dark:bg-var-dark">
          <ReactQueryProvider>
            {children}
            <div id="portal" />
            <Portal>{modals}</Portal>
          </ReactQueryProvider>
        </body>
      </ThemeProvider>
    </html>
  )
}
