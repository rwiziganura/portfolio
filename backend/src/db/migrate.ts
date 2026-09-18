import { db } from './client'

export async function migrate() {
  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      name      TEXT NOT NULL,
      email     TEXT NOT NULL,
      subject   TEXT NOT NULL,
      message   TEXT NOT NULL,
      read      INTEGER DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS projects (
      id           INTEGER PRIMARY KEY,
      title        TEXT NOT NULL,
      description  TEXT NOT NULL,
      category     TEXT NOT NULL,
      technologies TEXT NOT NULL,
      image        TEXT,
      github       TEXT,
      live         TEXT,
      featured     INTEGER DEFAULT 0,
      overview     TEXT,
      problem      TEXT,
      solution     TEXT,
      features     TEXT,
      challenges   TEXT,
      lessons      TEXT,
      screenshots  TEXT
    );

    CREATE TABLE IF NOT EXISTS skills (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT NOT NULL,
      category    TEXT NOT NULL,
      description TEXT NOT NULL,
      icon        TEXT NOT NULL
    );
  `)
  console.log('Database migrated.')
}
