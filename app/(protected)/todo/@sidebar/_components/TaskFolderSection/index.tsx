'use client'

import { TodoFolder } from '@/types/todo'
import { List } from '@/components/shared/List'
import { useRef } from 'react'
import Folder from '../../../_components/Folder'

interface Props {
  isOpenSide: boolean
  todoFolders?: TodoFolder[]
}

export default function TaskFolderSection({ isOpenSide, todoFolders }: Props) {
  const dragItem = useRef<TodoFolder | null>(null)
  const dragOverItem = useRef<TodoFolder | null>(null)
  const sortedFolders = todoFolders?.sort((a, b) => a.index - b.index)
  return (
    <List className="flex flex-col gap-2">
      {sortedFolders?.map((folder) => (
        <Folder
          key={folder.id}
          folder={folder}
          isOpenSide={isOpenSide}
          dragItem={dragItem}
          dragOverItem={dragOverItem}
        />
      ))}
    </List>
  )
}