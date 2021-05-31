
import { relative, extname } from 'path'
import fs from 'fs'
import { createHash } from 'crypto'
import Debug from 'debug'
import type {
  Transformer,
} from '@jest/transform'
import { transformSync, Loader } from 'esbuild'
import { resolveOptions } from './options'
import { UserOptions } from './type'

const debug = Debug('jest-esbuild')

const THIS_FILE = fs.readFileSync(__filename)

const createTransformer = (userOptions: UserOptions = {}): Transformer<UserOptions> => {
  const options = resolveOptions(userOptions)

  debug('%O', options)

  return {
    canInstrument: true,
    getCacheKey(fileData, filePath, transformOptions) {
      const { config, instrument, configString } = transformOptions

      return createHash('md5')
        .update(THIS_FILE)
        .update('\0', 'utf8')
        .update(JSON.stringify(options))
        .update('\0', 'utf8')
        .update(fileData)
        .update('\0', 'utf8')
        .update(relative(config.rootDir, filePath))
        .update('\0', 'utf8')
        .update(configString)
        .update('\0', 'utf8')
        .update(filePath)
        .update('\0', 'utf8')
        .update(instrument ? 'instrument' : '')
        .update('\0', 'utf8')
        .update(process.env.NODE_ENV || '')
        .digest('hex')
    },
    process(sourceText, sourcePath) {
      const result = transformSync(sourceText, {
        ...options,
        loader: userOptions.loader || extname(sourcePath).slice(1) as Loader,
      })

      if (result) {
        if (result.warnings.length) {
          result.warnings.forEach((m) => {
            // eslint-disable-next-line no-console
            console.warn(m)
          })
        }
        const { code, map } = result
        if (typeof code === 'string')
          return { code, map }
      }

      return sourceText
    },
  }
}

export default {
  createTransformer,
}
