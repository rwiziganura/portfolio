'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { BookOpen, CalendarDays, GraduationCap } from 'lucide-react'
import {
  currentLearningFocus,
  education,
  getEducationSubjects,
  hasCurrentLearningFocus,
  hasEducationContent,
  isCurrentEducation,
  formatEducationPeriod,
  type EducationEntry,
} from '@/lib/education-data'

const reveal = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

export function Education() {
  const shouldReduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const reduced = mounted ? Boolean(shouldReduceMotion) : true
  const motionProps = reduced
    ? { initial: false, whileInView: undefined, viewport: undefined, transition: undefined }
    : { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.2 }, transition: { duration: 0.55 } }

  return (
    <section id="education" aria-labelledby="education-heading" className="border-t border-border/70 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div {...motionProps} variants={reveal} className="max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-accent">Education</p>
          <h2 id="education-heading" className="mt-5 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">Learning the foundations. Building beyond them.</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">My academic background and the technical knowledge I&apos;m developing through structured learning and practical work.</p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
          <div className="grid gap-5 md:grid-cols-2">
            {education.map((entry, index) => <EducationCard key={entry.id} entry={entry} index={index} shouldReduceMotion={reduced} />)}
          </div>
          <motion.aside {...motionProps} variants={reveal} className="h-fit border border-border bg-card/40 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <BookOpen aria-hidden="true" className="size-4 text-accent" />
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">Current Learning</p>
            </div>
            <div className="mt-5 flex flex-col gap-3">
              {hasCurrentLearningFocus ? currentLearningFocus.map((item) => <p key={item} className="text-sm leading-6 text-foreground">{item}</p>) : <p className="text-sm leading-6 text-muted-foreground">Content coming soon.</p>}
            </div>
          </motion.aside>
        </div>
        {!hasEducationContent && <p className="sr-only">Education details coming soon.</p>}
      </div>
    </section>
  )
}

function EducationCard({ entry, index, shouldReduceMotion }: { entry: EducationEntry; index: number; shouldReduceMotion: boolean }) {
  const subjects = getEducationSubjects(entry)
  const current = isCurrentEducation(entry)
  return (
    <motion.article
      aria-label={current ? 'Current education' : `Education entry ${entry.id}`}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.25 }}
      variants={reveal}
      transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.1 }}
      className="group border border-border bg-card/30 p-5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent/50 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-9 shrink-0 items-center justify-center border border-border text-accent"><GraduationCap aria-hidden="true" className="size-4" /></div>
        {current && <span className="border border-accent/40 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent">Current</span>}
      </div>
      <h3 className="mt-6 text-xl font-medium tracking-tight text-foreground">{entry.institution}</h3>
      <p className="mt-2 text-base text-foreground">{entry.program}</p>
      <p className="mt-1 text-sm text-muted-foreground">{entry.level}</p>
      <div className="mt-5 flex items-center gap-2 font-mono text-xs text-muted-foreground"><CalendarDays aria-hidden="true" className="size-3.5 text-accent" />{formatEducationPeriod(entry)}</div>
      <p className="mt-5 text-sm leading-7 text-muted-foreground">{entry.description}</p>
      <div className="mt-6 border-t border-border/70 pt-5">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Relevant Areas</p>
        {subjects.length > 0 ? <ul className="mt-3 flex flex-wrap gap-2">{subjects.map((subject) => <li key={subject} className="border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground">{subject}</li>)}</ul> : <p className="mt-3 text-sm text-muted-foreground">Content coming soon.</p>}
      </div>
    </motion.article>
  )
}

export { EducationCard }
