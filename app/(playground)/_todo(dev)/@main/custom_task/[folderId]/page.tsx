'use client'

import Input from '@/components/shared/Input'
import { List } from '@/components/shared/List'
import Title from '@/components/shared/Title'
import { FormEvent, useEffect, useRef, useState } from 'react'
import useDataDrivenAnimation from '@/hooks/useStateChange'
import Text from '@/components/shared/Text'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import useOutsideClick from '@/hooks/useOutsideClick'

import { useSuspenseQuery } from '@tanstack/react-query'
import { todoQuery } from '@/services/queries/todo/todoQuery'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import Todo from '../../../_components/Todo'
import TaskOptionDropDown from '../../../_components/TaskOptionDropDown'
import { todoFolderQuery } from '@/services/queries/todo/todoFolderQuery'
import { useInput } from '@/hooks/useInput'
import useAddTodo from '@/services/mutates/todo/useAddTodo'
import { Tables } from '@/types/supabase'
import useUpdateTodo from '@/services/mutates/todo/useUpdateTodo'
import { useRouter } from 'next/navigation'
import cn from '@/lib/cn'

interface Props {
  params: { folderId: string }
  searchParams: { color: string }
}

export default function TaskForm({ params, searchParams }: Props) {
  const router = useRouter()
  const folderId = params.folderId
  const color = searchParams.color
  const [todoText, onChangeTodoText, setTodoText] = useInput('')
  const { onClick, ref, close, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const dropdownRef = useOutsideClick<HTMLButtonElement>(close)
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: todoFolders } = useSuspenseQuery(
    todoFolderQuery.getTodoFolder(supabase, me!.userId),
  )
  const { data: fetchedTodos } = useSuspenseQuery(
    todoQuery.getTodoFromFolder(supabase, me!.userId, Number(folderId)),
  )
  const sortedTodos = fetchedTodos.sort((a, b) => a.index - b.index)
  const todos = sortedTodos.filter((todo) => todo.is_complete === false)
  const completedTodos = sortedTodos.filter((todo) => todo.is_complete === true)
  const currentFolder = todoFolders.find(
    (folder) => folder.id === Number(folderId),
  )
  const { mutate: addTodo } = useAddTodo()
  const { mutate: updateTodo } = useUpdateTodo()

  const [showCompletedZone, setShowCompletedZone] = useState(false)
  const dragItem = useRef<Tables<'todo'> | null>(null)
  const dragOverItem = useRef<Tables<'todo'> | null>(null)
  const completedZone = useRef<HTMLDivElement>(null)
  const inProgressZone = useRef<HTMLDivElement>(null)

  const currentMonth = new Date().getMonth() + 1
  const currentDate = new Date().getDate()
  const currentYear = new Date().getFullYear()

  const handleSubmitTodo = (e: FormEvent) => {
    e.preventDefault()
    const folderIndex = JSON.parse(localStorage.getItem(folderId)!)
    const currentIndex = folderIndex.in_progress ?? 0
    const nextIndex = Number(currentIndex) + 1
    const nextTodo = {
      name: todoText,
      folderId: currentFolder!.id,
      userId: me!.userId,
      index: nextIndex,
    }
    addTodo(nextTodo, {
      onSuccess: () => {
        setTodoText('')
      },
    })
  }

  const handleUpdateButtonClick = (selectedTodo: Tables<'todo'>) => {
    const folderIndex = JSON.parse(localStorage.getItem(folderId)!)
    const inProgressLastIndex = folderIndex.in_progress ?? 0
    const completedLastIndex = folderIndex.completed ?? 0

    if (selectedTodo.is_complete) {
      updateTodo({
        ...selectedTodo,
        updated_at: new Date().toISOString(),
        index: inProgressLastIndex + 1,
        is_complete: false,
      })
    } else {
      updateTodo({
        ...selectedTodo,
        updated_at: new Date().toISOString(),
        index: completedLastIndex + 1,
        is_complete: true,
      })
    }
  }

  useEffect(() => {
    const isCompletedTodo = completedTodos.length >= 1
    const willCompleted = dragItem.current !== null
    setShowCompletedZone(isCompletedTodo || willCompleted)

    const prevIndex = JSON.parse(localStorage.getItem(folderId)!)
    let inProgressLastIndex = prevIndex?.in_progress ?? 0
    let completedLastIndex = prevIndex?.completed ?? 0

    if (completedTodos) {
      completedLastIndex = completedTodos[completedTodos.length - 1]?.index
    }
    if (todos) {
      inProgressLastIndex = todos[todos.length - 1]?.index
    }

    const nextIndex = JSON.stringify({
      completed: completedLastIndex,
      in_progress: inProgressLastIndex,
    })
    localStorage.setItem(folderId, nextIndex)
  }, [todos, completedTodos])

  useEffect(() => {
    if (!currentFolder) {
      router.push('/todo/main')
    }
  }, [currentFolder])

  return (
    <div
      className={cn(
        'relative flex h-[calc(100dvh-80px)] w-full flex-col gap-4 overflow-y-auto p-4',
        color === 'yellow' && 'bg-var-yellow/15 dark:bg-var-yellow/25',
        color === 'orange' && 'bg-var-orange/15 dark:bg-var-orange/25',
        color === 'black' && 'bg-black/15 dark:bg-black/25',
        color === 'blue' && 'bg-var-blue/15 dark:bg-var-blue/25',
        color === 'green' && 'bg-var-green/15 dark:bg-var-green/25',
        color === 'red' && 'bg-red-500/15 dark:bg-red-500/25',
        color === 'purple' && 'bg-purple-500/15 dark:bg-purple-500/25',
      )}
    >
      <form onSubmit={handleSubmitTodo} className={cn('max-w-72')}>
        <div className="relative flex items-center justify-between">
          <Title className="text-nowrap">{currentFolder?.name}</Title>
          <Button
            ref={dropdownRef}
            variant="icon"
            size="none"
            onClick={onClick}
          >
            <Icon view="0 -960 960 960" size={20}>
              <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
            </Icon>
          </Button>
          <TaskOptionDropDown
            folderId={currentFolder?.id}
            targetRef={ref}
            onTransitionEnd={onTransitionEnd}
          />
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <div className="relative">
            <Input
              value={todoText}
              onChange={onChangeTodoText}
              placeholder="할일을 입력하세요."
              dimension="sm"
              className="sticky w-full"
            />
            <Button
              variant="icon"
              size="none"
              type="submit"
              disabled={!todoText}
              className="absolute right-2 top-1/2 -translate-y-1/2 active:animate-none"
            >
              <Icon view="0 -960 960 960" size={18}>
                <path d="M440-160v-326L336-382l-56-58 200-200 200 200-56 58-104-104v326h-80ZM160-600v-120q0-33 23.5-56.5T240-800h480q33 0 56.5 23.5T800-720v120h-80v-120H240v120h-80Z" />
              </Icon>
            </Button>
          </div>
          <Text
            type="caption"
            size="sm"
            className="text-nowrap"
          >{`${currentYear}년 ${currentMonth}월 ${currentDate}일 오늘 할 일`}</Text>
        </div>
        <div className="mt-4 flex flex-col gap-4 text-left">
          {todos.length >= 1 && (
            <div
              ref={inProgressZone}
              className={cn(
                'flex animate-fade-in flex-col gap-4 border border-transparent transition',
              )}
            >
              <Title type="sub" className="text-nowrap">
                할 일
              </Title>
              <List className="flex flex-col gap-2">
                {todos.map((todo) => (
                  <Todo
                    isDraggable
                    key={todo.id}
                    todo={todo}
                    isComplete={todo.is_complete}
                    folderColor={currentFolder?.color}
                    onUpdate={handleUpdateButtonClick}
                    dragItem={dragItem}
                    dragOverItem={dragOverItem}
                  />
                ))}
              </List>
            </div>
          )}
          {showCompletedZone && (
            <div
              ref={completedZone}
              className={cn(
                'flex animate-fade-in flex-col gap-4 border border-transparent transition',
              )}
            >
              <Title type="sub" className="text-nowrap">
                완료됨
              </Title>
              <List className="flex flex-col gap-2">
                {completedTodos.map((todo) => (
                  <Todo
                    isDraggable
                    key={todo.id}
                    todo={todo}
                    isComplete={todo.is_complete}
                    folderColor={currentFolder?.color}
                    onUpdate={handleUpdateButtonClick}
                    dragItem={dragItem}
                    dragOverItem={dragOverItem}
                  />
                ))}
              </List>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
