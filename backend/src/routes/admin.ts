import { Router, Request, Response, NextFunction } from 'express'
import { RowDataPacket, ResultSetHeader } from 'mysql2'
import { pool } from '../db/client'

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
  try {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM contact_messages ORDER BY created_at DESC')
    res.json(rows)
  } catch (err) {
    console.error('GET /admin/messages failed:', err)
    res.status(500).json({ error: 'Failed to fetch messages.' })
  }
})

router.patch('/messages/:id/read', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) { res.status(400).json({ error: 'Invalid ID.' }); return }
  try {
    await pool.execute('UPDATE contact_messages SET read_status = 1 WHERE id = ?', [id])
    res.json({ success: true })
  } catch (err) {
    console.error('PATCH /admin/messages/:id/read failed:', err)
    res.status(500).json({ error: 'Failed to update message.' })
  }
})

router.delete('/messages/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) { res.status(400).json({ error: 'Invalid ID.' }); return }
  try {
    const [result] = await pool.execute<ResultSetHeader>('DELETE FROM contact_messages WHERE id = ?', [id])
    if (result.affectedRows === 0) { res.status(404).json({ error: 'Message not found.' }); return }
    res.json({ success: true })
  } catch (err) {
    console.error('DELETE /admin/messages/:id failed:', err)
    res.status(500).json({ error: 'Failed to delete message.' })
  }
})

// Projects
router.get('/projects', async (_req, res) => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM projects ORDER BY id ASC')
    res.json(rows)
  } catch (err) {
    console.error('GET /admin/projects failed:', err)
    res.status(500).json({ error: 'Failed to fetch projects.' })
  }
})

router.put('/projects/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) { res.status(400).json({ error: 'Invalid ID.' }); return }
  const { title, description, category, technologies, github, live, featured, overview, problem, solution, features, challenges, lessons } = req.body
  try {
    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE projects SET title=?, description=?, category=?, technologies=?, github=?, live=?, featured=?, overview=?, problem=?, solution=?, features=?, challenges=?, lessons=? WHERE id=?`,
      [
        title, description, category,
        JSON.stringify(technologies ?? []),
        github ?? null, live ?? null,
        featured ? 1 : 0,
        overview ?? null, problem ?? null, solution ?? null,
        JSON.stringify(features ?? []),
        JSON.stringify(challenges ?? []),
        JSON.stringify(lessons ?? []),
        id,
      ]
    )
    if (result.affectedRows === 0) { res.status(404).json({ error: 'Project not found.' }); return }
    res.json({ success: true })
  } catch (err) {
    console.error('PUT /admin/projects/:id failed:', err)
    res.status(500).json({ error: 'Failed to update project.' })
  }
})

// Skills
router.get('/skills', async (_req, res) => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM skills ORDER BY id ASC')
    res.json(rows)
  } catch (err) {
    console.error('GET /admin/skills failed:', err)
    res.status(500).json({ error: 'Failed to fetch skills.' })
  }
})

router.put('/skills/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) { res.status(400).json({ error: 'Invalid ID.' }); return }
  const { name, category, description } = req.body
  try {
    const [result] = await pool.execute<ResultSetHeader>(
      'UPDATE skills SET name=?, category=?, description=? WHERE id=?',
      [name, category, description, id]
    )
    if (result.affectedRows === 0) { res.status(404).json({ error: 'Skill not found.' }); return }
    res.json({ success: true })
  } catch (err) {
    console.error('PUT /admin/skills/:id failed:', err)
    res.status(500).json({ error: 'Failed to update skill.' })
  }
})

router.delete('/skills/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) { res.status(400).json({ error: 'Invalid ID.' }); return }
  try {
    const [result] = await pool.execute<ResultSetHeader>('DELETE FROM skills WHERE id = ?', [id])
    if (result.affectedRows === 0) { res.status(404).json({ error: 'Skill not found.' }); return }
    res.json({ success: true })
  } catch (err) {
    console.error('DELETE /admin/skills/:id failed:', err)
    res.status(500).json({ error: 'Failed to delete skill.' })
  }
})

export default router
