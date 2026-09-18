'use client'

import { motion } from 'framer-motion'
import { Check, Code2, Moon, Sun, ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

const motionConfig = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: 'easeOut' as const },
}

const tokens = [
  { label: 'Background', value: '--background', color: 'bg-background' },
  { label: 'Card', value: '--card', color: 'bg-card' },
  { label: 'Border', value: '--border', color: 'bg-border' },
  { label: 'Accent', value: '--accent', color: 'bg-accent' },
]

export function DesignSystemPreview() {
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('light', isLight)
    document.documentElement.classList.toggle('dark', !isLight)
  }, [isLight])

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-border pb-5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-accent">
              <Code2 aria-hidden="true" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">Ishimwe Rene</p>
              <p className="text-sm text-foreground">Portfolio foundation</p>
            </div>
          </div>
          <Button
            aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
            onClick={() => setIsLight((value) => !value)}
            size="icon"
            variant="outline"
          >
            {isLight ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
          </Button>
        </header>

        <section className="flex flex-1 flex-col justify-center py-16 sm:py-24">
          <motion.div {...motionConfig} className="max-w-3xl">
            <p className="mb-5 font-mono text-sm text-accent">01 / design system</p>
            <h1 className="max-w-2xl text-4xl leading-[1.05] font-semibold tracking-[-0.04em] text-balance sm:text-6xl">
              A considered foundation for meaningful software.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              A restrained visual language for Ishimwe Rene&apos;s developer portfolio. Dark by default, responsive by design, and ready to grow one thoughtful section at a time.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div {...motionConfig} transition={{ ...motionConfig.transition, delay: 0.08 }} className="rounded-xl border border-border bg-card p-5 sm:p-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="text-sm font-medium">Core components</p>
                  <p className="mt-1 text-xs text-muted-foreground">Reusable primitives, quietly expressive.</p>
                </div>
                <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] tracking-wide text-accent uppercase">Ready</span>
              </div>
              <div className="flex flex-wrap gap-3 pt-5">
                <Button>Primary action <ArrowUpRight data-icon="inline-end" /></Button>
                <Button variant="outline">Secondary action</Button>
                <Button variant="ghost">Quiet action</Button>
              </div>
              <div className="mt-7 flex flex-col gap-3">
                {['Clear visual hierarchy', 'Accessible interaction states', 'Responsive spacing scale'].map((item) => (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground" key={item}>
                    <span className="flex size-5 items-center justify-center rounded-full bg-accent/10 text-accent"><Check aria-hidden="true" /></span>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...motionConfig} transition={{ ...motionConfig.transition, delay: 0.16 }} className="rounded-xl border border-border bg-secondary p-5 sm:p-6">
              <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">Color tokens</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {tokens.map((token) => (
                  <div className="rounded-lg border border-border bg-card p-3" key={token.value}>
                    <div className={`mb-5 size-7 rounded-md border border-border ${token.color}`} />
                    <p className="text-xs font-medium">{token.label}</p>
                    <p className="mt-1 font-mono text-[10px] text-muted-foreground">{token.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <footer className="flex flex-col gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>Built with intention.</span>
          <span className="font-mono">320px → 1440px+</span>
        </footer>
      </div>
    </main>
  )
}
