'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, Mail, MapPin } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import {
  contactAccessibleEmailLabel,
  contactAccessibleLocationLabel,
  contactClosing,
  contactClosingAction,
  contactDescription,
  contactEmail,
  contactEmailHref,
  contactFormTitle,
  contactHasSocialLinks,
  contactHeading,
  contactInfoIntro,
  contactLabels,
  contactLocation,
  contactSectionId,
  contactSectionLabel,
  socialLinks,
  contactSubmissionNotice,
  isRealContactValue,
} from '@/lib/contact-data'

const reveal = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }

export function Contact() {
  const shouldReduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const reduced = mounted ? Boolean(shouldReduceMotion) : true
  const motionProps = reduced
    ? { initial: false, whileInView: undefined, viewport: undefined, transition: undefined }
    : { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.18 }, transition: { duration: 0.55 } }

  return (
    <section id={contactSectionId} aria-labelledby="contact-heading" className="border-t border-border/70 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div {...motionProps} variants={reveal} className="max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-accent">{contactSectionLabel}</p>
          <h2 id="contact-heading" className="mt-5 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">{contactHeading}</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">{contactDescription}</p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-20">
          <motion.div {...motionProps} variants={reveal} className="flex flex-col gap-9">
            <div>
              <h3 className="text-2xl font-medium tracking-tight text-foreground">Let&apos;s connect.</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">{contactInfoIntro}</p>
            </div>
            <div className="flex flex-col gap-4">
              <InfoItem icon={Mail} label={contactLabels.email} value={contactEmail} href={contactEmailHref} accessibleLabel={contactAccessibleEmailLabel} />
              <InfoItem icon={MapPin} label={contactLabels.location} value={contactLocation} accessibleLabel={contactAccessibleLocationLabel} />
            </div>
            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Social links</p>
              {contactHasSocialLinks ? <div className="mt-4 flex flex-wrap gap-3">{socialLinks.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={`Open ${link.label} profile`} className="inline-flex min-h-11 items-center gap-2 border border-border px-4 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">{link.label}<ExternalLink aria-hidden="true" className="size-3.5" /></a>)}</div> : <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">Social profiles will appear here when links are added.</p>}
            </div>
            <p className="border-l border-accent/60 pl-4 text-xs leading-6 text-muted-foreground">{contactSubmissionNotice}</p>
          </motion.div>

          <motion.div {...motionProps} variants={reveal} transition={reduced ? undefined : { duration: 0.55, delay: 0.1 }} className="border border-border bg-card/25 p-5 sm:p-8">
            <div className="mb-8 flex items-end justify-between gap-4 border-b border-border/70 pb-5"><div><p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-accent">Write a note</p><h3 className="mt-2 text-xl font-medium text-foreground">{contactFormTitle}</h3></div><span className="font-mono text-xs text-muted-foreground">01 / 01</span></div>
            <ContactForm />
          </motion.div>
        </div>

        <motion.div {...motionProps} variants={reveal} className="mt-20 border-t border-border/70 pt-8 sm:flex sm:items-end sm:justify-between sm:gap-8">
          <p className="text-lg font-medium tracking-tight text-foreground sm:text-xl">{contactClosing}</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-accent sm:mt-0">{contactClosingAction}</p>
        </motion.div>
      </div>
    </section>
  )
}

function InfoItem({ icon: Icon, label, value, href, accessibleLabel }: { icon: typeof Mail; label: string; value: string; href?: string; accessibleLabel: string }) {
  const content = <><span className="flex size-9 shrink-0 items-center justify-center border border-border text-accent"><Icon aria-hidden="true" className="size-4" /></span><span className="min-w-0"><span className="block font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{label}</span><span className="mt-1 block truncate text-sm text-foreground">{value}</span></span></>
  return href && isRealContactValue(value) ? <a href={href} aria-label={accessibleLabel} className="flex max-w-sm items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">{content}</a> : <div className="flex max-w-sm items-center gap-3">{content}</div>
}

export default Contact
        
