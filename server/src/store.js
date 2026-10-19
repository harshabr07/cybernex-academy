import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.resolve(here, '../data')
const dbPath = path.join(dataDir, 'db.json')

export async function readDb() {
  await fs.mkdir(dataDir, { recursive: true })
  try {
    const raw = await fs.readFile(dbPath, 'utf8')
    return JSON.parse(raw)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
    const initial = { users: [], progress: {} }
    await writeDb(initial)
    return initial
  }
}

export async function writeDb(data) {
  await fs.mkdir(dataDir, { recursive: true })
  const tempPath = `${dbPath}.tmp`
  await fs.writeFile(tempPath, JSON.stringify(data, null, 2), 'utf8')
  await fs.rename(tempPath, dbPath)
}
