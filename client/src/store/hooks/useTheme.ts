'use client'

import { cva } from 'class-variance-authority'
import { create } from 'zustand'
import { ColorScheme, Theme } from '@/src/types/enums'

interface ThemeState {
  color: ColorScheme
  theme: Theme
  setColor: (color: ColorScheme) => void
  setTheme: (theme: Theme) => void
}

export const colorTheme = cva('', {
  variants: {
    color: {
      green: 'bg-var-green dark:bg-var-green',
      black: 'bg-var-black text-white dark:bg-white dark:text-var-dark',
      yellow: 'bg-var-yellow dark:bg-var-yellow',
      blue: 'bg-var-blue dark:bg-var-blue',
      orange: 'bg-var-orange dark:bg-var-orange',
    },
  },
})

export const ringTheme = cva('', {
  variants: {
    width: {
      1: 'ring-1',
      2: 'ring-2',
      4: 'ring-4',
      8: 'ring-8',
    },
    color: {
      blue: 'ring-var-bold_blue dark:ring-var-bold_blue',
      orange: 'ring-var-bold_orange dark:ring-var-bold_orange',
      yellow: 'ring-var-bold_yellow dark:ring-var-bold_yellow',
      green: 'ring-var-bold_green dark:ring-var-bold_green',
      black: 'ring-var-bold_black dark:ring-var-bold_black',
    },
  },
})

export const useTheme = create<ThemeState>((set) => ({
  color: ColorScheme.BLACK,
  theme: Theme.LIGHT,
  setColor: (color: ColorScheme) => set((state) => ({ ...state, color })),
  setTheme: (theme: Theme) => set((state) => ({ ...state, theme })),
}))
