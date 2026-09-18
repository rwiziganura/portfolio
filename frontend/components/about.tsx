'use client'

import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { DeveloperCard } from '@/components/developer-card'

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative isolate px-5 py-20 sm:px-8 lg:px-10 lg:py-32"
    >
      {/* Background gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_26%_58%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent_40%),linear-gradient(to_bottom,transparent_70%,color-mix(in_srgb,var(--background)_80%,transparent))]"
      />

      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent"
        >
          About Me
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          transition={{ duration: 0.42 }}
          viewport={{ once: true, margin: '-100px' }}
          id="about-title"
          className="text-balance text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl"
        >
          Building useful things with code.
        </motion.h2>

        {/* Main layout - two columns on desktop */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20"
        >
          {/* Left: Developer Card */}
          <motion.div variants={fadeUp} transition={{ duration: 0.38 }}>
            <DeveloperCard />
          </motion.div>

          {/* Right: About Content */}
          <motion.div variants={fadeUp} transition={{ duration: 0.38 }} className="flex flex-col justify-center gap-8">
            {/* About paragraphs */}
            <div className="space-y-5">
              <p className="text-base leading-7 text-foreground sm:text-lg sm:leading-8">
                I&apos;m a software developer focused on building modern web applications and learning through practical projects. I enjoy turning ideas into useful, functional, and intuitive digital experiences.
              </p>
              <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                My work spans frontend and backend development, with a particular interest in building complete applications from the user interface to the underlying functionality.
              </p>
            </div>

            {/* Information grid */}
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-8 sm:gap-12">
                <div>
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Based In
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">Rwanda</p>
                </div>
                <div>
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Role
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">Software Developer</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:gap-12 pt-4 border-t border-border">
                <div>
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Focus
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">Web Development</p>
                </div>
                <div>
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Currently Learning
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">React</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

            {/* CV Download */}
            <motion.a
              href="/cv.pdf"
              download
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 px-5 py-3 text-sm font-medium text-accent transition-colors duration-200 hover:border-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Download className="size-4" aria-hidden="true" /> Download CV
            </motion.a>

            {/* Technology highlights */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          transition={{ duration: 0.38, delay: 0.16 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 border-t border-border pt-12"
        >
          <p className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Technology
          </p>
          <div className="flex flex-wrap gap-3">
            {['React', 'JavaScript', 'Node.js', 'PHP', 'MySQL'].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border/60 bg-secondary/40 px-4 py-2 font-mono text-xs font-medium text-foreground/80 transition-all duration-200 hover:border-accent/50 hover:text-accent"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
