'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, CircleDot } from 'lucide-react'
import { currentFocus, getJourneyContentLabel, hasCurrentFocus, hasJourneyContent, journey } from '@/lib/experience-data'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function Journey() {
  const shouldReduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const reduced = mounted ? Boolean(shouldReduceMotion) : true
  const motionProps = reduced
    ? { initial: false, whileInView: undefined, viewport: undefined, transition: undefined }
    : { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.2 }, transition: { duration: 0.55 } }
  const emptyLabel = getJourneyContentLabel(hasJourneyContent)

  return (
    <section id="journey" aria-labelledby="journey-heading" className="border-t border-border/70 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div {...motionProps} variants={reveal} className="max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-accent">My Journey</p>
          <h2 id="journey-heading" className="mt-5 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">Learning, building, improving.</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">A look at the path I&apos;ve taken while developing my skills and building practical software projects.</p>
        </motion.div>

        <div className="mt-16 grid gap-16 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-24">
          <div className="relative">
            <motion.div
              aria-hidden="true"
              className="absolute bottom-5 left-[7px] top-5 w-px origin-top bg-border lg:left-1/2 lg:-translate-x-1/2"
              initial={reduced ? false : { scaleY: 0 }}
              whileInView={reduced ? undefined : { scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            <div className="flex flex-col gap-10 lg:gap-0">
              {journey.map((entry, index) => (
                <TimelineItem key={entry.id} entry={entry} index={index} shouldReduceMotion={reduced} />
              ))}
            </div>
          </div>

          <motion.aside {...motionProps} variants={reveal} className="h-fit border border-border bg-card/40 p-5 lg:mt-10">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">Current Focus</p>
            <div className="mt-5 flex flex-col gap-3">
              {hasCurrentFocus ? currentFocus.map((item) => <p key={item} className="text-sm leading-6 text-foreground">{item}</p>) : <p className="text-sm leading-6 text-muted-foreground">Content coming soon.</p>}
            </div>
            <ArrowUpRight aria-hidden="true" className="mt-8 text-accent" />
          </motion.aside>
        </div>
        {emptyLabel && <p className="sr-only">{emptyLabel}</p>}
      </div>
    </section>
  )
}

function TimelineItem({ entry, index, shouldReduceMotion }: { entry: (typeof journey)[number]; index: number; shouldReduceMotion: boolean }) {
  return (
    <motion.article
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.35 }}
      variants={reveal}
      transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.1 }}
      className="group relative pl-10 lg:w-1/2 lg:pl-0 lg:pr-14 lg:odd:ml-0 lg:even:ml-auto lg:even:pl-14 lg:even:pr-0"
    >
      <span className="absolute left-0 top-1.5 z-10 flex size-4 items-center justify-center rounded-full border border-accent bg-background lg:left-auto lg:right-[-8px] lg:group-even:left-[-8px] lg:group-even:right-auto">
        <CircleDot aria-hidden="true" className="size-2.5 text-accent" />
      </span>
      <div className="border border-border bg-card/30 p-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:border-accent/50 sm:p-6">
        <p className="font-mono text-xs text-accent">{entry.year}</p>
        <h3 className="mt-3 text-lg font-medium tracking-tight text-foreground">{entry.title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{entry.description}</p>
        {entry.technologies.length > 0 && <div className="mt-5 flex flex-wrap gap-2">{entry.technologies.map((technology) => <span key={technology} className="border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground">{technology}</span>)}</div>}
      </div>
    </motion.article>
  )
}
