import { pool } from './client'

export async function migrate() {
  const conn = await pool.getConnection()
  try {
    await conn.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id         INT AUTO_INCREMENT PRIMARY KEY,
        name       VARCHAR(255) NOT NULL,
        email      VARCHAR(255) NOT NULL,
        subject    VARCHAR(255) NOT NULL,
        message    TEXT NOT NULL,
        read_status TINYINT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    await conn.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id           INT PRIMARY KEY,
        title        VARCHAR(255) NOT NULL,
        description  TEXT NOT NULL,
        category     VARCHAR(100) NOT NULL,
        technologies TEXT NOT NULL,
        image        TEXT,
        github       TEXT,
        live         TEXT,
        featured     TINYINT DEFAULT 0,
        overview     TEXT,
        problem      TEXT,
        solution     TEXT,
        features     TEXT,
        challenges   TEXT,
        lessons      TEXT,
        screenshots  TEXT
      )
    `)
    await conn.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id          INT AUTO_INCREMENT PRIMARY KEY,
        name        VARCHAR(255) NOT NULL UNIQUE,
        category    VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        icon        VARCHAR(100) NOT NULL
      )
    `)
    console.log('Database migrated.')
  } finally {
    conn.release()
  }
}
