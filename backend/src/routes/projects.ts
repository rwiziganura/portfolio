import { Router, Request, Response } from 'express'
import { db } from '../db/client'

const router = Router()

function parseProject(row: Record<string, unknown>) {
  return {
    ...row,
    technologies: JSON.parse(row.technologies as string),
    features: JSON.parse(row.features as string),
    challenges: JSON.parse(row.challenges as string),
    lessons: JSON.parse(row.lessons as string),
    screenshots: JSON.parse(row.screenshots as string),
    featured: row.featured === 1,
  }
}

router.get('/', async (_req: Request, res: Response) => {
  const result = await db.execute('SELECT * FROM projects')
  res.json(result.rows.map(parseProject))
})

router.get('/:id', async (req: Request, res: Response) => {
  const result = await db.execute({
    sql: 'SELECT * FROM projects WHERE id = ?',
    args: [String(req.params.id)],
  })
  if (!result.rows.length) {
    res.status(404).json({ error: 'Project not found' })
    return
  }
  res.json(parseProject(result.rows[0] as Record<string, unknown>))
})

export default router
