import { Router, Request, Response, NextFunction } from 'express'
import { db } from '../db/client'

const router = Router()

// Auth middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['x-admin-token']
  if (!process.env.ADMIN_SECRET || token !== process.env.ADMIN_SECRET) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  next()
}

router.use(requireAdmin)

// Messages
router.get('/messages', async (_req, res) => {
  const result = await db.execute('SELECT * FROM contact_messages ORDER BY created_at DESC')
  res.json(result.rows)
})

router.patch('/messages/:id/read', async (req, res) => {
  await db.execute({ sql: 'UPDATE contact_messages SET read = 1 WHERE id = ?', args: [req.params.id] })
  res.json({ success: true })
})

router.delete('/messages/:id', async (req, res) => {
  await db.execute({ sql: 'DELETE FROM contact_messages WHERE id = ?', args: [req.params.id] })
  res.json({ success: true })
})

// Projects
router.get('/projects', async (_req, res) => {
  const result = await db.execute('SELECT * FROM projects')
  res.json(result.rows)
})

router.put('/projects/:id', async (req, res) => {
  const { title, description, category, technologies, github, live, featured, overview, problem, solution, features, challenges, lessons } = req.body
  await db.execute({
    sql: `UPDATE projects SET title=?, description=?, category=?, technologies=?, github=?, live=?, featured=?, overview=?, problem=?, solution=?, features=?, challenges=?, lessons=? WHERE id=?`,
    args: [
      title, description, category,
      JSON.stringify(technologies ?? []),
      github ?? null, live ?? null,
      featured ? 1 : 0,
      overview ?? null, problem ?? null, solution ?? null,
      JSON.stringify(features ?? []),
      JSON.stringify(challenges ?? []),
      JSON.stringify(lessons ?? []),
      req.params.id,
    ],
  })
  res.json({ success: true })
})

// Skills
router.get('/skills', async (_req, res) => {
  const result = await db.execute('SELECT * FROM skills')
  res.json(result.rows)
})

router.put('/skills/:id', async (req, res) => {
  const { name, category, description } = req.body
  await db.execute({
    sql: 'UPDATE skills SET name=?, category=?, description=? WHERE id=?',
    args: [name, category, description, req.params.id],
  })
  res.json({ success: true })
})

router.delete('/skills/:id', async (req, res) => {
  await db.execute({ sql: 'DELETE FROM skills WHERE id = ?', args: [req.params.id] })
  res.json({ success: true })
})

export default router
