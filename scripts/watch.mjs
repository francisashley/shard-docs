import esbuild from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'
import postcss from 'postcss'

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
    plugins: [sassPlugin()],
  })
  .then(() => console.log('⚡ Watching'))
