import { UserOptions, ResolvedOptions } from './type'

export function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  return {
    format: 'cjs',
    target: 'es2019',
    sourcemap: 'inline',
    ...userOptions,
  }
}
