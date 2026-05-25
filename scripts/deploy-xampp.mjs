import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

if (!existsSync(dist)) {
  console.error('dist/ not found — run build first')
  process.exit(1)
}

console.log('✓ XAMPP build ready in dist/')
console.log('')
console.log('  1. Start Apache in XAMPP Control Panel')
console.log('  2. Open: http://localhost/portfolio/portfolio/')
console.log('     (or directly: http://localhost/portfolio/portfolio/dist/)')
