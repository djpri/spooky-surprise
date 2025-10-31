import { useEffect, useState } from 'react'
import { Button } from './ui/Button'

const STORAGE_KEY = 'theme'
type ThemeMode = 'light' | 'dark' | 'system'

const themeSequence: ThemeMode[] = ['light', 'dark', 'system']
const themeLabels: Record<ThemeMode, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
}

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'system'
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' ? stored : 'system'
}

const applyTheme = (mode: ThemeMode, prefersDark: boolean) => {
  const useDark = mode === 'dark' || (mode === 'system' && prefersDark)
  document.documentElement.classList.toggle('dark', useDark)
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(() => getInitialTheme())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    applyTheme(mode, media.matches)

    if (mode === 'system') {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, mode)
    }

    const handleChange = (event: MediaQueryListEvent) => {
      if (mode === 'system') {
        applyTheme('system', event.matches)
      }
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [mode])

  const handleToggle = () => {
    const nextIndex = (themeSequence.indexOf(mode) + 1) % themeSequence.length
    setMode(themeSequence[nextIndex])
  }

  return (
    <Button
      type="button"
      onClick={handleToggle}
      className="w-full max-w-xs justify-between hover:bg-muted hover:text-foreground"
    >
      <span className="text-sm font-medium">Theme:</span>
      <span className="text-sm font-semibold">{themeLabels[mode]}</span>
    </Button>
  )
}

export default ThemeToggle
