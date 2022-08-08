import { TransformOptions } from 'esbuild'

export interface UserOptions extends TransformOptions {
  implementation?: typeof import('esbuild')
}
export interface ResolvedOptions extends TransformOptions {}
