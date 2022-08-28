import esbuild from 'esbuild'

function build(entryFile, outFile) {
  esbuild
    .build({
      entryPoints: [entryFile],
      outfile: outFile,
      platform: 'node',
      bundle: true,
      target: 'esnext',
      format: 'esm',
      banner: {
        js: "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
      },
    })
    .then(() => console.log('⚡ CLI built'))
    .catch((e) => {
      console.log('Error building:', e.message)
      process.exit(1)
    })
}

build('src/cli/shard-docs.ts', 'bin/shard-docs.mjs')
