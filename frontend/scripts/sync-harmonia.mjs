// Refreshes src/harmonia/ from a Harmonia checkout (optional; the copy is committed).
// Usage: HARMONIA_DIR=/path/to/Harmonia npm run sync:harmonia
import { cpSync, existsSync } from 'node:fs'
import path from 'node:path'

const here = import.meta.dirname
const source = process.env.HARMONIA_DIR ?? path.resolve(here, '../../../Harmonia')
if (!existsSync(source)) {
  console.error(`Harmonia not found at ${source}. Set HARMONIA_DIR to a checkout of https://github.com/alainritter/Harmonia`)
  process.exit(1)
}
const target = path.resolve(here, '../src/harmonia')
for (const file of ['tokens.css', 'base.css', 'components.css', 'shadcn.css', 'tailwind-scale.css', 'fonts.css', 'fonts']) {
  cpSync(path.join(source, file), path.join(target, file), { recursive: true })
}
console.log(`Synced Harmonia from ${source}`)
