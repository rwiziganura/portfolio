import { Router, Request, Response } from 'express'
import nodemailer from 'nodemailer'
import { db } from '../db/client'

const router = Router()

function validate(body: Record<string, unknown>) {
  const { name, email, subject, message } = body
  if (typeof name !== 'string' || name.trim().length < 2) return 'Please enter your name.'
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Please enter a valid email address.'
  if (typeof subject !== 'string' || subject.trim().length < 3) return 'Please enter a subject.'
  if (typeof message !== 'string' || message.trim().length < 10) return 'Message must be at least 10 characters.'
  return null
}

router.post('/', async (req: Request, res: Response) => {
  const error = validate(req.body)
  if (error) {
    res.status(400).json({ error })
    return
  }

  const { name, email, subject, message } = req.body as Record<string, string>

  // Save to database
  await db.execute({
    sql: 'INSERT INTO contact_messages (name, email, subject, message) VALUES (?,?,?,?)',
    args: [name.trim(), email.trim(), subject.trim(), message.trim()],
  })

  // Send email if SMTP is configured
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      })
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: process.env.RECEIVER_EMAIL,
        replyTo: email,
        subject: `[Portfolio] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`,
      })
    } catch {
      // Message is saved to DB even if email fails
    }
  }

  res.json({ success: true })
})

export default router
