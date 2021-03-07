import { UserOptions, ResolvedOptions } from './type'

export function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  return {
    loader: userOptions.loader || 'ts',
    format: userOptions.format || 'cjs',
    target: userOptions.target || 'es2018',
    ...(userOptions.jsxFactory ? { jsxFactory: userOptions.jsxFactory } : {}),
    ...(userOptions.jsxFragment ? { jsxFragment: userOptions.jsxFragment } : {}),
    sourcemap: userOptions.sourcemap ?? true,
  }
}
