import { Router, Request, Response } from 'express'
import { RowDataPacket, ResultSetHeader } from 'mysql2'
import { pool } from '../db/client'

const router = Router()

// GET /api/skills
router.get('/', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM skills ORDER BY id ASC')
    res.json(rows)
  } catch (err) {
    console.error('GET /skills failed:', err)
    res.status(500).json({ error: 'Failed to fetch skills.' })
  }
})

// POST /api/skills
router.post('/', async (req: Request, res: Response) => {
  const { name, category, description, icon } = req.body
  if (!name?.trim() || !category?.trim() || !description?.trim() || !icon?.trim()) {
    res.status(400).json({ error: 'name, category, description and icon are required.' }); return
  }
  try {
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO skills (name, category, description, icon) VALUES (?,?,?,?)',
      [name.trim(), category.trim(), description.trim(), icon.trim()]
    )
    res.status(201).json({ success: true, id: result.insertId })
  } catch (err) {
    console.error('POST /skills failed:', err)
    res.status(500).json({ error: 'Failed to create skill.' })
  }
})

// PUT /api/skills/:id
router.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) { res.status(400).json({ error: 'Invalid skill ID.' }); return }
  const { name, category, description, icon } = req.body
  if (!name?.trim() || !category?.trim() || !description?.trim() || !icon?.trim()) {
    res.status(400).json({ error: 'name, category, description and icon are required.' }); return
  }
  try {
    const [result] = await pool.execute<ResultSetHeader>(
      'UPDATE skills SET name=?, category=?, description=?, icon=? WHERE id=?',
      [name.trim(), category.trim(), description.trim(), icon.trim(), id]
    )
    if (result.affectedRows === 0) { res.status(404).json({ error: 'Skill not found.' }); return }
    res.json({ success: true })
  } catch (err) {
    console.error('PUT /skills/:id failed:', err)
    res.status(500).json({ error: 'Failed to update skill.' })
  }
})

// DELETE /api/skills/:id
router.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) { res.status(400).json({ error: 'Invalid skill ID.' }); return }
  try {
    const [result] = await pool.execute<ResultSetHeader>('DELETE FROM skills WHERE id=?', [id])
    if (result.affectedRows === 0) { res.status(404).json({ error: 'Skill not found.' }); return }
    res.json({ success: true })
  } catch (err) {
    console.error('DELETE /skills/:id failed:', err)
    res.status(500).json({ error: 'Failed to delete skill.' })
  }
})

export default router
