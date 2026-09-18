import { db } from './client'
import { projects } from '../data/projects'
import { skills } from '../data/skills'

export async function seed() {
  for (const p of projects) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO projects
            (id, title, description, category, technologies, image, github, live, featured, overview, problem, solution, features, challenges, lessons, screenshots)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      args: [
        p.id, p.title, p.description, p.category,
        JSON.stringify(p.technologies ?? []),
        p.image ?? null, p.github ?? null, p.live ?? null,
        p.featured ? 1 : 0,
        p.overview ?? null, p.problem ?? null, p.solution ?? null,
        JSON.stringify(p.features ?? []),
        JSON.stringify(p.challenges ?? []),
        JSON.stringify(p.lessons ?? []),
        JSON.stringify(p.screenshots ?? []),
      ],
    })
  }

  for (const s of skills) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO skills (name, category, description, icon) VALUES (?,?,?,?)`,
      args: [s.name, s.category, s.description, s.icon],
    })
  }

  console.log('Database seeded.')
}
