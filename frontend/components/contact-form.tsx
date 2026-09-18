'use client'

import { FormEvent, useState } from 'react'
import { ArrowUpRight, LoaderCircle } from 'lucide-react'
import { useToast } from '@/components/toast'
import {
  contactFormAccessibleName,
  contactFormButtonLabel,
  contactFormLoadingLabel,
  contactMaxMessageLength,
  contactMessageCountLabel,
  contactMessagePlaceholder,
  contactNamePlaceholder,
  contactEmailPlaceholder,
  contactSubjectPlaceholder,
  emptyContactForm,
  type ContactFormErrors,
  type ContactFormValues,
  validateContactForm,
} from '@/lib/contact-data'

export function ContactForm() {
  const { toast } = useToast()
  const [values, setValues] = useState<ContactFormValues>(emptyContactForm)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [submitting, setSubmitting] = useState(false)

  function updateValue(field: keyof ContactFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateContactForm(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error()
      setValues(emptyContactForm)
      toast('success', 'Message sent!', "Thanks for reaching out — I'll get back to you soon.")
    } catch {
      toast('error', 'Something went wrong.', 'Please try again or email me directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label={contactFormAccessibleName} className="flex flex-col gap-5">
      <Field label="Name" name="name" value={values.name} placeholder={contactNamePlaceholder} error={errors.name} autoComplete="name" onChange={(v) => updateValue('name', v)} />
      <Field label="Email" name="email" type="email" value={values.email} placeholder={contactEmailPlaceholder} error={errors.email} autoComplete="email" onChange={(v) => updateValue('email', v)} />
      <Field label="Subject" name="subject" value={values.subject} placeholder={contactSubjectPlaceholder} error={errors.subject} autoComplete="off" onChange={(v) => updateValue('subject', v)} />
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          maxLength={contactMaxMessageLength}
          value={values.message}
          onChange={(e) => updateValue('message', e.target.value)}
          placeholder={contactMessagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : 'contact-message-count'}
          className="min-h-36 w-full resize-y border border-input bg-transparent px-4 py-3 text-sm leading-7 text-foreground outline-none placeholder:text-muted-foreground/60 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20"
        />
        <div className="flex items-start justify-between gap-4">
          <p id="contact-message-count" className="text-xs text-muted-foreground">{contactMessageCountLabel(values.message.length)}</p>
          {errors.message && <p id="contact-message-error" className="text-right text-xs text-destructive" role="alert">{errors.message}</p>}
        </div>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-primary px-5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-fit"
      >
        {submitting
          ? <><LoaderCircle aria-hidden="true" className="size-4 animate-spin" />{contactFormLoadingLabel}</>
          : <>{contactFormButtonLabel}<ArrowUpRight aria-hidden="true" className="size-4" /></>
        }
      </button>
    </form>
  )
}

function Field({ label, name, value, placeholder, error, type = 'text', autoComplete, onChange }: {
  label: string; name: string; value: string; placeholder: string
  error?: string; type?: string; autoComplete: string; onChange: (value: string) => void
}) {
  const errorId = `contact-${name}-error`
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`contact-${name}`} className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input
        id={`contact-${name}`}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-12 w-full border border-input bg-transparent px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20"
      />
      {error && <p id={errorId} className="text-xs text-destructive" role="alert">{error}</p>}
    </div>
  )
}

export default ContactForm
