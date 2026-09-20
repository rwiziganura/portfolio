import mysql from 'mysql2/promise'
import fs from 'fs'
import path from 'path'

export const pool = mysql.createPool({
  host: process.env.TIDB_HOST,
  port: Number(process.env.TIDB_PORT || 4000),
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE,
  ssl: {
    minVersion: 'TLSv1.2',
    ca: fs.readFileSync(path.resolve(__dirname, '../../certs/isrgrootx1.pem')),
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export async function testDatabaseConnection() {
  const connection = await pool.getConnection()
  try {
    await connection.ping()
    console.log('✅ TiDB Cloud connection successful')
  } finally {
    connection.release()
  }
}
