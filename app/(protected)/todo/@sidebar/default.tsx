'use client'

import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import Title from '@/components/shared/Title'
import cn from '@/lib/cn'
import { useEffect, useState } from 'react'
import TaskFolderSection from './_components/TaskFolderSection'
import AddFolderSection from './_components/AddFolderSection'
import SideMenuButtonSection from './_components/SideMenuButtonSection'
import { TodoFolder } from '@/types/todo'
import { useTodo } from '@/store/useTodo'
import { useRouter } from 'next/navigation'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'

export const INIT_TODO_FOLDER: TodoFolder = {
  id: 0,
  name: '새로운 폴더',
  createdAt: 0,
  updatedAt: 0,
  dotColor: 'black',
}

export default function SideBar() {
  const router = useRouter()
  const [isOpenSide, setOpenSide] = useState(false)
  const { todoFolders, setTodoFolders } = useTodo()

  const handleSideMenu = () => {
    setOpenSide((prev) => !prev)
  }

  const handleAddTodoFolder = () => {
    router.push('/todo/add_todo_folder')
    const nextFolder = {
      ...INIT_TODO_FOLDER,
      id: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    const nextFolders = [...todoFolders, nextFolder]
    setTodoFolders(nextFolders)
  }

  useEffect(() => {
    const prevTodos = JSON.parse(localStorage.getItem('todo-folder')!) || []
    setTodoFolders([...prevTodos])
  }, [])

  useEffect(() => {
    localStorage.setItem('todo-folder', JSON.stringify(todoFolders))
  }, [todoFolders])

  return (
    <Container
      isBackground
      className={cn(
        'z-30 flex h-[calc(100dvh-80px)] w-80 flex-shrink-0 flex-col gap-4 p-4 shadow-md',
        isOpenSide ? 'w-72' : 'w-fit',
      )}
    >
      <Box col className="items-between h-full gap-2">
        <Box row className="items-center justify-between">
          {isOpenSide && <Title>전체</Title>}
          <SideMenuButtonSection
            isOpenSide={isOpenSide}
            onSideMenu={handleSideMenu}
          />
        </Box>
        <TaskFolderSection isOpenSide={isOpenSide} todoFolders={todoFolders} />
      </Box>
      <Box
        row
        className={cn('justify-between gap-2', isOpenSide ? '' : 'flex-col')}
      >
        <Button variant="icon" onClick={handleAddTodoFolder} className="gap-2">
          <Icon view="0 -960 960 960" size={18}>
            <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
          </Icon>
          {isOpenSide && '새 폴더 추가'}
        </Button>
        <Button variant="icon">
          <Icon view="0 -960 960 960" size={18}>
            <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
          </Icon>
        </Button>
      </Box>
    </Container>
  )
}
