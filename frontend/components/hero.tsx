'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useSpring, useTransform, useMotionValue } from 'framer-motion'
import { ArrowDown, ArrowRight, Download } from 'lucide-react'
import { CodeWindow } from '@/components/code-window'

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
}

function MagneticButton({ children, className, onClick }: { children: React.ReactNode; className: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    x.set((e.clientX - left - width / 2) * 0.35)
    y.set((e.clientY - top - height / 2) * 0.35)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  )
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const bgX = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), { stiffness: 50, damping: 20 })
  const bgY = useSpring(useTransform(mouseY, [0, 1], [-14, 14]), { stiffness: 50, damping: 20 })

  useEffect(() => {
    setMounted(true)
    if (shouldReduceMotion) return
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [shouldReduceMotion, mouseX, mouseY])

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-28 sm:px-8 lg:px-10 lg:pb-16 lg:pt-24"
    >
      {/* bc.png — deepest layer, parallax */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-50px] -z-30 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bc.png')", x: bgX, y: bgY }}
      />

      {/* Dark overlay */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-background/75" />

      {/* Accent radial glow — mid layer */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_60%_40%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent)]" />

      {/* Bottom fade into page */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-background to-transparent" />

      {/* Subtle grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.022] [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: shouldReduceMotion ? 0 : 0.08 }}
          className="max-w-xl"
        >
          <motion.p variants={fadeUp} transition={{ duration: 0.35 }} className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
            Hello, I&apos;m
          </motion.p>
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.42 }}
            id="hero-title"
            className="text-balance text-5xl font-semibold tracking-[-0.055em] text-foreground sm:text-6xl lg:text-[clamp(3.5rem,6vw,5.5rem)] lg:leading-[0.98]"
          >
            Ishimwe Rene
          </motion.h1>
          <motion.p variants={fadeUp} transition={{ duration: 0.38 }} className="mt-5 text-xl font-medium tracking-[-0.02em] text-accent sm:text-2xl">
            Software Developer
          </motion.p>
          <motion.p variants={fadeUp} transition={{ duration: 0.38 }} className="mt-6 max-w-md text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            I build modern web applications with clean interfaces, reliable functionality, and practical solutions.
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.38 }} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton
              onClick={() => scrollTo('#projects')}
              className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              View My Projects <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollTo('#contact')}
              className="inline-flex min-h-11 items-center rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/70 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              Contact Me
            </MagneticButton>
            <motion.a
              href="/cv.pdf"
              download
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-accent/40 px-5 py-3 text-sm font-medium text-accent transition-colors duration-200 hover:border-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <Download className="size-4" aria-hidden="true" /> Download CV
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.48, delay: 0.36 }}
          className="lg:pl-2"
        >
          <CodeWindow />
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => scrollTo('#about')}
        className="group absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 rounded-md px-3 py-2 font-mono text-[9px] uppercase tracking-[0.26em] text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:bottom-8"
      >
        <span>Scroll to explore</span>
        <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" />
      </button>
    </section>
  )
}
