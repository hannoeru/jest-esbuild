import path from 'path'
import fs from 'fs'
import { createHash } from 'crypto'
import type {
  Transformer,
} from '@jest/transform'
import { transformSync } from 'esbuild'
import { resolveOptions } from './options'
import { UserOptions } from './type'

const THIS_FILE = fs.readFileSync(__filename)

type CreateTransformer = Transformer['createTransformer']

export const createTransformer: CreateTransformer = (userOptions: UserOptions = {}) => {
  const options = resolveOptions(userOptions)

  return {
    canInstrument: true,
    getCacheKey(fileData, filePath, configStr, transformOptions) {
      const { config, instrument } = transformOptions

      return createHash('md5')
        .update(THIS_FILE)
        .update('\0', 'utf8')
        .update(JSON.stringify(options))
        .update('\0', 'utf8')
        .update(fileData)
        .update('\0', 'utf8')
        .update(path.relative(config.rootDir, filePath))
        .update('\0', 'utf8')
        .update(configStr)
        .update('\0', 'utf8')
        .update(filePath)
        .update('\0', 'utf8')
        .update(instrument ? 'instrument' : '')
        .update('\0', 'utf8')
        .update(process.env.NODE_ENV || '')
        .digest('hex')
    },
    process(sourceText) {
      const result = transformSync(sourceText, options)

      if (result) {
        const { code, map } = result
        if (typeof code === 'string')
          return { code, map }
      }

      return sourceText
    },
  }
}
