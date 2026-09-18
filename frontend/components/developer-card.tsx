'use client'

import { motion } from 'framer-motion'

export function DeveloperCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-100px' }}
      className="relative"
    >
      <div className="group relative h-96 w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
        {/* Terminal-like header */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_100%_0%,color-mix(in_srgb,var(--accent)_5%,transparent),transparent_50%)]" />

        {/* Top bar */}
        <div className="border-b border-border bg-secondary/30 px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-accent/60" />
            <div className="size-2 rounded-full bg-accent/40" />
            <div className="size-2 rounded-full bg-accent/20" />
            <span className="ml-auto font-mono text-[10px] text-muted-foreground">Developer</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center gap-6 p-8 pt-12">
          {/* Code symbol */}
          <div className="flex items-center justify-center">
            <span className="font-mono text-3xl font-bold text-accent/80">&lt; /&gt;</span>
          </div>

          {/* Name */}
          <div className="text-center">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Name</p>
            <h3 className="mt-2 text-2xl font-semibold text-foreground">Rene</h3>
          </div>

          {/* Role */}
          <div className="text-center">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Role</p>
            <p className="mt-2 text-base text-accent">Software Developer</p>
          </div>

          {/* Location */}
          <div className="text-center">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Location</p>
            <p className="mt-2 text-sm text-foreground">Rwanda</p>
          </div>

          {/* Status indicator */}
          <div className="mt-4 flex items-center gap-2">
            <div className="size-2 rounded-full bg-green-500/60 animate-pulse" />
            <span className="font-mono text-[10px] text-muted-foreground">Available</span>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>
    </motion.div>
  )
}
