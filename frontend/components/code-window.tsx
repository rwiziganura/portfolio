'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Braces, Circle } from 'lucide-react'
import { useEffect, useState } from 'react'

const lines = [
  ['const', ' developer', ' = {'],
  ['  name:', ' "Rene",'],
  ['  role:', ' "Software Developer",'],
  ['  stack:', ' ['],
  ['    "React",'],
  ['    "Node.js",'],
  ['    "PHP"'],
  ['  ]'],
  ['};'],
]

export function CodeWindow() {
  const shouldReduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => setMounted(true), [])

  const reduced = mounted ? Boolean(shouldReduceMotion) : true

  useEffect(() => {
    if (reduced) return
    const handleMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2
      const y = (event.clientY / window.innerHeight - 0.5) * 2
      setTilt({ x: y * -2, y: x * 2 })
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [reduced])

  return (
    <div className="relative mx-auto w-full max-w-[570px] lg:mr-0" aria-hidden="true">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.28, ease: 'easeOut' }}
        style={{ rotateX: tilt.x, rotateY: tilt.y }}
        whileHover={{ y: -5 }}
        className="relative overflow-hidden rounded-2xl border border-border/90 bg-card/80 shadow-2xl shadow-black/20 backdrop-blur-xl transition-[box-shadow] duration-300 hover:shadow-accent/5"
      >
        <div className="flex h-12 items-center justify-between border-b border-border/70 px-4 sm:px-5">
          <div className="flex items-center gap-1.5">
            <Circle className="size-2.5 fill-[#ff5f57] text-[#ff5f57]" />
            <Circle className="size-2.5 fill-[#febc2e] text-[#febc2e]" />
            <Circle className="size-2.5 fill-[#28c840] text-[#28c840]" />
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
            <Braces className="size-3.5 text-accent" />
            developer.js
          </div>
          <span className="w-12" />
        </div>
        <div className="px-4 py-6 font-mono text-[11px] leading-[2.05] sm:px-7 sm:py-8 sm:text-[13px]">
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + index * 0.045, duration: 0.24 }}
              className="flex min-w-0"
            >
              <span className="mr-5 w-4 shrink-0 select-none text-right text-muted-foreground/40">{index + 1}</span>
              <code>
                <span className={index === 0 || index === 8 ? 'text-accent' : 'text-foreground/85'}>{line[0]}</span>
                <span className={index > 0 && index < 8 ? 'text-foreground/80' : 'text-foreground/85'}>{line[1]}</span>
                <span className="text-foreground/85">{line[2]}</span>
              </code>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border/60 px-4 py-3 font-mono text-[10px] text-muted-foreground/70 sm:px-7">
          <span>UTF-8</span>
          <span>main · JavaScript</span>
        </div>
      </motion.div>
      <motion.div
        animate={reduced ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-5 right-3 rounded-xl border border-accent/25 bg-card px-3.5 py-2.5 shadow-lg shadow-black/15 sm:-right-5 sm:px-4"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Currently building</p>
        <p className="mt-1 text-xs font-medium text-foreground">Thoughtful digital products</p>
      </motion.div>
    </div>
  )
}

export default CodeWindow

