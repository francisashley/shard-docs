import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
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
  resolve: {
    alias: {
      'react-element-to-jsx-string': 'node_modules/react-element-to-jsx-string/dist/esm/index.js',
    },
  },
  define: {
    'process.env': process.env,
  },
})
