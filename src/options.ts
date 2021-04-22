import { UserOptions, ResolvedOptions } from './type'

export function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  return {
    loader: 'ts',
    format: 'cjs',
    target: 'es2018',
    sourcemap: true,
    ...userOptions,
  }
}
