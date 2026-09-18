'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { Skill } from '@/lib/skills-data'

interface SkillCardProps {
  skill: Skill
  index: number
}

export function SkillCard({ skill, index }: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const IconComponent = Icons[skill.icon as keyof typeof Icons] as React.ComponentType<{ className: string }>

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    setTilt({ x: (y - 0.5) * -16, y: (x - 0.5) * 16 })
    setGlowPos({ x: x * 100, y: y * 100 })
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: index * 0.05 } } }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: hovered ? 1.03 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
      className="group relative overflow-hidden rounded-lg border border-border bg-card/50 p-6 cursor-default"
    >
      {/* Moving glow spot */}
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-lg opacity-60 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 65%)`,
          }}
        />
      )}

      {/* Border glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-lg border border-accent/0 transition-all duration-300 group-hover:border-accent/30" />

      {/* Icon */}
      <motion.div
        className="mb-4 inline-flex rounded-md bg-accent/10 p-3"
        animate={{ translateZ: hovered ? 12 : 0 }}
        style={{ transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {IconComponent ? (
          <IconComponent className="size-5 text-accent transition-transform duration-300 group-hover:scale-110" />
        ) : (
          <div className="size-5 bg-accent/30" />
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        animate={{ translateZ: hovered ? 6 : 0 }}
        style={{ transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <h3 className="text-base font-semibold text-foreground">{skill.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{skill.description}</p>
        <div className="mt-4 inline-block">
          <span className="rounded-full bg-secondary/50 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-300 group-hover:bg-accent/20 group-hover:text-accent">
            {skill.category}
          </span>
        </div>
      </motion.div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-accent to-transparent transition-all duration-500 group-hover:w-full" />
    </motion.div>
  )
}
