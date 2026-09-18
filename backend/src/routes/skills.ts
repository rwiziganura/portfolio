import { Router, Request, Response } from 'express'
import { db } from '../db/client'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const result = await db.execute('SELECT * FROM skills')
  res.json(result.rows)
})

export default router
