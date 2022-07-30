import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'
import json from 'rollup-plugin-json'
import typescript from '@rollup/plugin-typescript'

export default [
  transpile('src/index.ts', 'dist', 'index'),
  transpile('src/components/shards/CodeSampleShard.tsx', 'dist/shards', 'CodeSampleShard'),
  transpile('src/components/shards/SectionShard.tsx', 'dist/shards', 'SectionShard'),
  transpile(
    'src/components/renderers/CodeBlockRenderer.tsx',
    'dist/renderers',
    'CodeBlockRenderer'
  ),
]

function transpile(input, outputPath, outputFileName) {
  return {
    input,
    output: [
      {
        file: outputPath + '/' + outputFileName + '.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: outputPath + '/' + outputFileName + '.es.js',
        format: 'es',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [
      typescript(),
      external(),
      postcss({ extract: true }),
      url({ exclude: ['**/*.svg'] }),
      svgr(),
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs(),
      json(),
    ],
  }
}
