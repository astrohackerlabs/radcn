import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const sourceDir = path.join(rootDir, 'raw-icons')
const outputDir = path.join(rootDir, 'radcn/apps/docs/public/images')
const faviconPath = path.join(rootDir, 'radcn/apps/docs/public/favicon.ico')
const outputTsFile = path.join(rootDir, 'radcn/apps/docs/app/ui/images.ts')
const imageWebPath = '/images'
const webpSizes = [32, 64, 96, 128, 180, 200, 300, 400]
const faviconSource = 'radcn-1'

const outputPaths = []

fs.mkdirSync(outputDir, { recursive: true })
fs.mkdirSync(path.dirname(outputTsFile), { recursive: true })

for (const file of fs.readdirSync(sourceDir).sort()) {
  if (path.extname(file).toLowerCase() !== '.png') continue

  const baseName = path.basename(file, '.png')
  const sourcePath = path.join(sourceDir, file)

  for (const size of webpSizes) {
    const outputFileName = `${baseName}-${size}.webp`
    const outputPath = path.join(outputDir, outputFileName)
    const webPath = `${imageWebPath}/${outputFileName}`

    await sharp(sourcePath)
      .resize(size, size, { fit: 'cover' })
      .webp({ quality: 92 })
      .toFile(outputPath)

    outputPaths.push(webPath)
    console.log(`Processed ${outputFileName}`)
  }

  if (baseName === faviconSource) {
    await sharp(sourcePath)
      .resize(128, 128, { fit: 'cover' })
      .png()
      .toFile(faviconPath)

    console.log('Processed favicon.ico as 128x128 PNG')
  }
}

const typeContent = `export type DocsImage =\n  ${outputPaths
    .sort()
    .map((imagePath) => `| "${imagePath}"`)
    .join('\n  ')}\n\nexport const docsImage = (image: DocsImage) => image\n`

fs.writeFileSync(outputTsFile, typeContent)
console.log(`Generated ${path.relative(rootDir, outputTsFile)}`)
