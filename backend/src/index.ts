import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { migrate } from './db/migrate'
import { seed } from './db/seed'
import { testDatabaseConnection } from './db/client'
import adminRouter from './routes/admin'
import contactRouter from './routes/contact'
import projectsRouter from './routes/projects'
import skillsRouter from './routes/skills'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }))
app.use(express.json())

app.use('/api/admin', adminRouter)
app.use('/api/contact', contactRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/skills', skillsRouter)

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

async function start() {
  await testDatabaseConnection().catch((err) => {
    console.error('❌ TiDB Cloud connection failed:', err.message)
    process.exit(1)
  })
  await migrate()
  await seed()
  app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`))
}

start()
