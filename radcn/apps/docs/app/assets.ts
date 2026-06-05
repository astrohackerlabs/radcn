import { createAssetServer } from 'remix/assets'
import * as path from 'node:path'

const rootDir = process.cwd()
const workspaceDir = path.resolve(rootDir, '../../..')

export const assetServer = createAssetServer({
  basePath: '/assets',
  rootDir,
  fileMap: {
    'app/*path': 'app/*path',
    'node_modules/.pnpm/*path': '../../../node_modules/.pnpm/*path',
    'node_modules/*path': 'node_modules/*path',
  },
  allow: [
    'app/assets/**',
    'node_modules/**',
    '../../../node_modules/.pnpm/**',
    path.join(workspaceDir, 'node_modules/.pnpm/**'),
  ],
  deny: ['app/**/*.server.*'],
  sourceMaps: process.env.NODE_ENV === 'development' ? 'external' : undefined,
  scripts: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development'),
    },
  },
})
