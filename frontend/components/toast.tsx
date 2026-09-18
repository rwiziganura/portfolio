'use client'

import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, X, AlertCircle } from 'lucide-react'

type ToastType = 'success' | 'error'

interface Toast {
  id: number
  type: ToastType
  title: string
  description?: string
}

interface ToastContextValue {
  toast: (type: ToastType, title: string, description?: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const counter = useRef(0)

  const toast = useCallback((type: ToastType, title: string, description?: string) => {
    const id = ++counter.current
    setToasts((prev) => [...prev, { id, type, title, description }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4500)
  }, [])

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        aria-label="Notifications"
        className="fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center gap-3 sm:bottom-8"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              className={`flex w-[min(92vw,420px)] items-start gap-3 rounded-xl border px-4 py-3.5 shadow-xl shadow-black/30 backdrop-blur-xl ${
                t.type === 'success'
                  ? 'border-accent/30 bg-background/90 text-foreground'
                  : 'border-destructive/30 bg-background/90 text-foreground'
              }`}
            >
              {/* Icon */}
              <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
                t.type === 'success' ? 'bg-accent/15 text-accent' : 'bg-destructive/15 text-destructive'
              }`}>
                {t.type === 'success'
                  ? <Check className="size-3" aria-hidden="true" />
                  : <AlertCircle className="size-3" aria-hidden="true" />
                }
              </span>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-5">{t.title}</p>
                {t.description && (
                  <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{t.description}</p>
                )}
              </div>

              {/* Dismiss */}
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss notification"
                className="mt-0.5 shrink-0 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none"
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>

              {/* Progress bar */}
              <motion.div
                className={`absolute bottom-0 left-0 h-0.5 rounded-b-xl ${t.type === 'success' ? 'bg-accent/50' : 'bg-destructive/50'}`}
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 4.5, ease: 'linear' }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}
