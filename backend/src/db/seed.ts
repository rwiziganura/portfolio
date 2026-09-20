import { pool } from './client'
import { projects } from '../data/projects'
import { skills } from '../data/skills'

export async function seed() {
  const conn = await pool.getConnection()
  try {
    for (const p of projects) {
      await conn.query(
        `INSERT INTO projects
          (id, title, description, category, technologies, image, github, live, featured, overview, problem, solution, features, challenges, lessons, screenshots)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
         ON DUPLICATE KEY UPDATE
          title=VALUES(title), description=VALUES(description), category=VALUES(category),
          technologies=VALUES(technologies), image=VALUES(image), github=VALUES(github),
          live=VALUES(live), featured=VALUES(featured), overview=VALUES(overview),
          problem=VALUES(problem), solution=VALUES(solution), features=VALUES(features),
          challenges=VALUES(challenges), lessons=VALUES(lessons), screenshots=VALUES(screenshots)`,
        [
          p.id, p.title, p.description, p.category,
          JSON.stringify(p.technologies ?? []),
          p.image ?? null, p.github ?? null, p.live ?? null,
          p.featured ? 1 : 0,
          p.overview ?? null, p.problem ?? null, p.solution ?? null,
          JSON.stringify(p.features ?? []),
          JSON.stringify(p.challenges ?? []),
          JSON.stringify(p.lessons ?? []),
          JSON.stringify(p.screenshots ?? []),
        ]
      )
    }

    for (const s of skills) {
      await conn.query(
        `INSERT IGNORE INTO skills (name, category, description, icon) VALUES (?,?,?,?)`,
        [s.name, s.category, s.description, s.icon]
      )
    }

    console.log('Database seeded.')
  } finally {
    conn.release()
  }
}
