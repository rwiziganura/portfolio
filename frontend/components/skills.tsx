'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { categories, getSkillsByCategory, getAllSkills, SkillCategory } from '@/lib/skills-data'
import { SkillCard } from '@/components/skill-card'

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All')
  const shouldReduceMotion = useReducedMotion()

  const displayedSkills = activeCategory === 'All' ? getAllSkills() : getSkillsByCategory(activeCategory as SkillCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.03,
      },
    },
  }

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative isolate px-5 py-20 sm:px-8 lg:px-10 lg:py-32"
    >
      {/* Background gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_74%_42%,color-mix(in_srgb,var(--accent)_6%,transparent),transparent_40%),linear-gradient(to_bottom,transparent_70%,color-mix(in_srgb,var(--background)_80%,transparent))]"
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
          Technical Skills
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          transition={{ duration: 0.42 }}
          viewport={{ once: true, margin: '-100px' }}
          id="skills-title"
          className="text-balance text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl"
        >
          Tools I use to build applications.
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          transition={{ duration: 0.38, delay: 0.08 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
        >
          Technologies and tools I work with across frontend, backend, databases, and development workflows.
        </motion.p>

        {/* Category filter tabs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          transition={{ duration: 0.38, delay: 0.12 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-12 flex flex-wrap items-center gap-3"
          role="tablist"
        >
          {/* All button */}
          <button
            onClick={() => setActiveCategory('All')}
            role="tab"
            aria-selected={activeCategory === 'All'}
            aria-controls="skills-grid"
            className={`rounded-full border px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.1em] transition-all duration-300 ${
              activeCategory === 'All'
                ? 'border-accent bg-accent/15 text-accent'
                : 'border-border bg-transparent text-muted-foreground hover:border-accent/40 hover:text-foreground'
            }`}
          >
            All
          </button>

          {/* Category buttons */}
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              role="tab"
              aria-selected={activeCategory === category}
              aria-controls="skills-grid"
              className={`rounded-full border px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.1em] transition-all duration-300 ${
                activeCategory === category
                  ? 'border-accent bg-accent/15 text-accent'
                  : 'border-border bg-transparent text-muted-foreground hover:border-accent/40 hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          id="skills-grid"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {displayedSkills.map((skill, index) => (
            <SkillCard key={`${skill.name}-${skill.category}`} skill={skill} index={index} />
          ))}
        </motion.div>

        {/* Empty state (if needed) */}
        {displayedSkills.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 rounded-lg border border-border/50 bg-card/30 px-8 py-12 text-center"
          >
            <p className="text-sm text-muted-foreground">No skills in this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
