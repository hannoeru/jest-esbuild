
import { relative, extname } from 'path'
import { createHash } from 'crypto'
import Debug from 'debug'
import { transformSync, Loader } from 'esbuild'
import { Transformer } from '@jest/transform'
import { resolveOptions } from './options'
import { UserOptions } from './type'

const debug = Debug('jest-esbuild')

const createTransformer = (userOptions: UserOptions = {}): Transformer<UserOptions> => {
  const options = resolveOptions(userOptions)

  debug('%O', options)

  return {
    canInstrument: true,
    getCacheKey(fileData, filePath, transformOptions) {
      const { config, instrument, configString } = transformOptions

      return createHash('md5')
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
    process(source, path) {
      const result = transformSync(source, {
        ...options,
        loader: userOptions.loader || extname(path).slice(1) as Loader,
      })

      if (result) {
        if (result.warnings.length) {
          result.warnings.forEach((m) => {
            // eslint-disable-next-line no-console
            console.warn(m)
          })
        }
        return {
          code: result.code,
          map: result.map,
        }
      }

      return source
    },
  }
}

export default {
  createTransformer,
}
