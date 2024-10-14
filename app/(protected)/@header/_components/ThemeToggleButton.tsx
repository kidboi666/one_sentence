'use client'

import Button from '@/components/shared/Button'

import { useTheme } from '@/store/useTheme'
import { TTheme } from '@/types/theme'
import Icon from '@/components/shared/Icon'
import cn from '@/lib/cn'

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme()

  const changeDocumentClass = (theme: TTheme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleThemeChange = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    changeDocumentClass(nextTheme)
  }

  return (
    <nav className="relative flex gap-2">
      <Button
        variant="icon"
        onClick={handleThemeChange}
        className="flex w-full items-center justify-between gap-2 py-2"
      >
        <div className="size-[18px] gap-2 overflow-hidden">
          <div
            className={cn(
              'transition duration-300 ease-in-out',
              theme === 'dark' ? '-translate-y-[18px]' : '',
            )}
          >
            <Icon view="0 -960 960 960" size={18}>
              <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
            </Icon>
            <Icon view="0 -960 960 960" size={18}>
              <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" />
            </Icon>
          </div>
        </div>
        <div
          className={cn(
            'h-fit w-8 rounded-full p-[1px] transition',
            theme === 'dark' ? 'bg-green-500' : 'bg-zinc-400',
          )}
        >
          <div
            className={cn(
              'size-4 rounded-full bg-zinc-200 transition',
              theme === 'dark' ? 'translate-x-[14px]' : '',
            )}
          />
        </div>
      </Button>
    </nav>
  )
}