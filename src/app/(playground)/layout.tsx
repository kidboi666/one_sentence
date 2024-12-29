'use client'

import { usePathname } from 'next/navigation'
import { PropsWithChildren, ReactNode } from 'react'
import { Container } from '@/src/components/Container'
import Portal from '@/src/components/Portal'
import ToastContainer from '@/src/components/ToastContainer'

interface Props {
  header: ReactNode
  sidebar: ReactNode
  modal: ReactNode
}

export default function Layout({ header, sidebar, children, modal }: PropsWithChildren<Props>) {
  const pathname = usePathname()
  const isModalOpen = pathname.startsWith('/modal')

  return (
    <>
      {header}
      {sidebar}
      {isModalOpen && <Portal>{modal}</Portal>}
      <ToastContainer />
      <Container className="my-8 flex flex-1 justify-center px-2 sm:ml-[80px] sm:px-4">
        <Container className="w-full lg:w-[880px]">{children}</Container>
      </Container>
    </>
  )
}
