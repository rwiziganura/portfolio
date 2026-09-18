'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return false
  const saved = localStorage.getItem('theme')
  if (saved) return saved === 'light'
  return window.matchMedia('(prefers-color-scheme: light)').matches
}

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setIsLight(getInitialTheme())
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const theme = isLight ? 'light' : 'dark'
    document.documentElement.classList.toggle('light', isLight)
    document.documentElement.classList.toggle('dark', !isLight)
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('theme', theme)
  }, [isLight, mounted])

  return (
    <Button
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      onClick={() => setIsLight((v) => !v)}
      size="icon"
      variant="ghost"
      className="size-9 rounded-full text-muted-foreground transition-colors hover:bg-accent/10 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
    >
      {mounted ? (isLight ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />) : <Sun aria-hidden="true" />}
    </Button>
  )
}
