import { spawnSync } from 'child_process'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const vite = spawnSync('npx', ['vite', 'build'], {
  cwd: root,
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, XAMPP: '1' },
})

if (vite.status !== 0) process.exit(vite.status ?? 1)

const deploy = spawnSync('node', ['scripts/deploy-xampp.mjs'], {
  cwd: root,
  stdio: 'inherit',
  shell: true,
})

process.exit(deploy.status ?? 0)
