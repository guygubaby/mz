import type { Options } from 'tsup'

const options: Options = {
  splitting: false,
  sourcemap: false,
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  entryPoints: [
    'src/index.ts',
  ],
  external: ['vue', 'medium-zoom'],
}

export default options
