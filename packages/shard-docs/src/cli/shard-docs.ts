#!/usr/bin/env node

import chalk from 'chalk'
import fs from 'fs-extra'
import arg from 'arg'
import { spawn } from 'node:child_process'
import path from 'path'
import url from 'url'
import Table from 'cli-table'

function parseArgumentsIntoOptions(rawArgs: string[]) {
  const args = arg(
    { '--entry': String, '--debug': Boolean, '--basePath': String },
    { argv: rawArgs.slice(2) }
  )

  if (!args._[0]) {
    throw new Error("missing command 'build' or 'watch")
  } else if (!['dev', 'build'].includes(args._[0])) {
    throw new Error("invalid command. valid commands are 'build' or 'watch'")
  } else if (!args['--entry']) {
    throw new Error('missing required argument: --entry')
  }

  return {
    command: args._[0],
    entry: args['--entry'] || '',
    debug: args['--debug'] || false,
    basePath: args['--basePath'] || '/',
  }
}

export function cli(args: string[]) {
  const options = parseArgumentsIntoOptions(args)

  const paths = {
    binFolder: path.dirname(url.fileURLToPath(import.meta.url)),
    templateFolder: path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '../template'),
    docsFolder: path.resolve(process.cwd(), './.docs'),
    buildFolder: path.resolve(process.cwd(), './.build'),
    entryFile: path.resolve(process.cwd(), options.entry),
  }

  if (options.debug) {
    var table = new Table({
      head: ['', chalk.blue('Path')],
      rows: [
        [chalk.blue('CWD'), process.cwd()],
        [chalk.blue('Bin folder'), paths.binFolder],
        [chalk.blue('Template folder'), paths.templateFolder],
        [chalk.blue('Docs folder'), paths.docsFolder],
        [chalk.blue('Build folder'), paths.buildFolder],
        [chalk.blue('Entry File'), paths.entryFile],
      ],
    })
    console.log(table.toString())
  }

  const run = (input: string) => {
    const inputParts = input.split(' ')
    const build = spawn(inputParts[0], inputParts.slice(1), { stdio: 'inherit' })
    build.stdout?.on('data', (data) => console.log(data.toString()))
    build.stderr?.on('data', (data) => console.error(data.toString()))
    build.on('exit', (code) => console.log('child process exited with code ' + code))
  }

  fs.copy(paths.templateFolder, paths.docsFolder, (err) => {
    if (err) return console.error(err)
    if (options.command === 'build') {
      run(
        `vite build ${paths.docsFolder} --outDir ../.build --emptyOutDir --base ${options.basePath}`
      )
    } else if (options.command === 'dev') {
      run(`vite ${paths.docsFolder}`)
    }
  })
}

cli(process.argv)
