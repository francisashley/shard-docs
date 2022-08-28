import esbuild from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'
import postcss from 'postcss'
import alias from 'esbuild-plugin-alias'
import path from 'path'

// Generate CSS/JS Builds
esbuild
  .build({
    entryPoints: ['src/index.ts'],
    outdir: 'dist',
    bundle: true,
    metafile: true,
    external: ['react'],
    format: 'esm',
    watch: true,
    plugins: [
      sassPlugin(),
      alias({
        'react-element-to-jsx-string': path.resolve(
          process.cwd(),
          'node_modules/react-element-to-jsx-string/dist/esm/index.js'
        ),
      }),
    ],
  })
  .then(() => console.log('⚡ Watching'))
