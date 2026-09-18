'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Code2, ExternalLink } from 'lucide-react'
import { Project } from '@/lib/projects-data'

interface ProjectCardProps {
  project: Project
  index: number
  featured?: boolean
}

export function ProjectCard({ project, index, featured }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    setTilt({ x: (y - 0.5) * -10, y: (x - 0.5) * 10 })
    setGlowPos({ x: x * 100, y: y * 100 })
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: hovered ? 1.02 : 1 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card cursor-pointer transition-colors duration-300 hover:border-accent/40 ${
        featured ? 'lg:col-span-2 lg:flex-row' : ''
      }`}
    >
      {/* Moving glow */}
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-lg opacity-70"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 60%)`,
          }}
        />
      )}

      {/* Preview area */}
      <div className={`relative flex flex-shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-secondary ${featured ? 'lg:w-1/2' : 'h-48'}`}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <motion.div
          className="relative z-10 text-6xl font-bold text-muted-foreground/10 select-none"
          animate={{ scale: hovered ? 1.15 : 1, translateZ: hovered ? 20 : 0 }}
          style={{ transformStyle: 'preserve-3d' }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          {project.title.charAt(0)}
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className={`relative z-20 flex flex-col justify-between p-6 ${featured ? 'lg:w-1/2' : 'flex-grow'}`}
        animate={{ translateZ: hovered ? 8 : 0 }}
        style={{ transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">{project.category}</p>
          <h3 className="mb-3 text-xl font-semibold text-foreground transition-colors duration-200 group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        </div>

        {project.technologies.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.08, y: -1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center rounded-md bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              View Project
            </Link>
          </motion.div>
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              <ExternalLink className="size-4" /> Live Demo
            </motion.a>
          )}
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-accent/50 hover:bg-secondary"
            >
              <Code2 className="size-4" /> GitHub
            </motion.a>
          )}
        </div>
      </motion.div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 z-20 h-0.5 w-0 bg-gradient-to-r from-accent via-accent/60 to-transparent transition-all duration-500 group-hover:w-full" />
    </motion.div>
  )
}
