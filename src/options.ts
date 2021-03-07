import { TransformOptions } from 'esbuild'
import { UserOptions } from './type'

export function resolveOptions(userOptions: UserOptions): TransformOptions {
  return {
    format: userOptions.format || 'cjs',
    target: userOptions.target || 'es2018',
    ...(userOptions.jsxFactory ? { jsxFactory: userOptions.jsxFactory } : {}),
    ...(userOptions.jsxFragment ? { jsxFragment: userOptions.jsxFragment } : {}),
    sourcemap: userOptions.sourcemap,
  }
}
