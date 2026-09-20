import { Router, Request, Response } from 'express'
import { RowDataPacket, ResultSetHeader } from 'mysql2'
import { pool } from '../db/client'

const router = Router()

function parseProject(row: RowDataPacket) {
  return {
    ...row,
    technologies: tryParse(row.technologies, []),
    features:     tryParse(row.features, []),
    challenges:   tryParse(row.challenges, []),
    lessons:      tryParse(row.lessons, []),
    screenshots:  tryParse(row.screenshots, []),
    featured:     row.featured === 1,
  }
}

function tryParse(value: unknown, fallback: unknown) {
  try { return JSON.parse(value as string) } catch { return fallback }
}

// GET /api/projects
router.get('/', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM projects ORDER BY id ASC')
    res.json(rows.map(parseProject))
  } catch (err) {
    console.error('GET /projects failed:', err)
    res.status(500).json({ error: 'Failed to fetch projects.' })
  }
})

// GET /api/projects/:id
router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) { res.status(400).json({ error: 'Invalid project ID.' }); return }
  try {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM projects WHERE id = ?', [id])
    if (!rows.length) { res.status(404).json({ error: 'Project not found.' }); return }
    res.json(parseProject(rows[0]))
  } catch (err) {
    console.error('GET /projects/:id failed:', err)
    res.status(500).json({ error: 'Failed to fetch project.' })
  }
})

// POST /api/projects
router.post('/', async (req: Request, res: Response) => {
  const { id, title, description, category, technologies, image, github, live, featured, overview, problem, solution, features, challenges, lessons, screenshots } = req.body
  if (!title?.trim() || !description?.trim() || !category?.trim()) {
    res.status(400).json({ error: 'title, description and category are required.' }); return
  }
  try {
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO projects (id, title, description, category, technologies, image, github, live, featured, overview, problem, solution, features, challenges, lessons, screenshots)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        id ?? null,
        title.trim(), description.trim(), category.trim(),
        JSON.stringify(technologies ?? []),
        image ?? null, github ?? null, live ?? null,
        featured ? 1 : 0,
        overview ?? null, problem ?? null, solution ?? null,
        JSON.stringify(features ?? []),
        JSON.stringify(challenges ?? []),
        JSON.stringify(lessons ?? []),
        JSON.stringify(screenshots ?? []),
      ]
    )
    res.status(201).json({ success: true, id: result.insertId || id })
  } catch (err) {
    console.error('POST /projects failed:', err)
    res.status(500).json({ error: 'Failed to create project.' })
  }
})

// PUT /api/projects/:id
router.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) { res.status(400).json({ error: 'Invalid project ID.' }); return }
  const { title, description, category, technologies, image, github, live, featured, overview, problem, solution, features, challenges, lessons, screenshots } = req.body
  if (!title?.trim() || !description?.trim() || !category?.trim()) {
    res.status(400).json({ error: 'title, description and category are required.' }); return
  }
  try {
    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE projects SET title=?, description=?, category=?, technologies=?, image=?, github=?, live=?, featured=?, overview=?, problem=?, solution=?, features=?, challenges=?, lessons=?, screenshots=?
       WHERE id=?`,
      [
        title.trim(), description.trim(), category.trim(),
        JSON.stringify(technologies ?? []),
        image ?? null, github ?? null, live ?? null,
        featured ? 1 : 0,
        overview ?? null, problem ?? null, solution ?? null,
        JSON.stringify(features ?? []),
        JSON.stringify(challenges ?? []),
        JSON.stringify(lessons ?? []),
        JSON.stringify(screenshots ?? []),
        id,
      ]
    )
    if (result.affectedRows === 0) { res.status(404).json({ error: 'Project not found.' }); return }
    res.json({ success: true })
  } catch (err) {
    console.error('PUT /projects/:id failed:', err)
    res.status(500).json({ error: 'Failed to update project.' })
  }
})

// DELETE /api/projects/:id
router.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) { res.status(400).json({ error: 'Invalid project ID.' }); return }
  try {
    const [result] = await pool.execute<ResultSetHeader>('DELETE FROM projects WHERE id = ?', [id])
    if (result.affectedRows === 0) { res.status(404).json({ error: 'Project not found.' }); return }
    res.json({ success: true })
  } catch (err) {
    console.error('DELETE /projects/:id failed:', err)
    res.status(500).json({ error: 'Failed to delete project.' })
  }
})

export default router
