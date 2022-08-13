import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
import remarkGfm from 'remark-gfm'
import rehypePrism from '@mapbox/rehype-prism'

// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(),
  plugins: [
    viteCommonjs(),
    mdx({
      // See https://mdxjs.com/advanced/plugins
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
    }),
    react(),
  ],

  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        // Solves:
        // https://github.com/vitejs/vite/issues/5308
        // add the name of your package
        esbuildCommonjs(['react-frame-component']),
      ],
    },
  },
})
