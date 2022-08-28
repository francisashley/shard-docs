#!/usr/bin/env node

import chalk from 'chalk'
import fs from 'fs-extra'
import arg from 'arg'
import { exec } from 'node:child_process'
import path from 'path'
import url from 'url'
import Table from 'cli-table'

function parseArgumentsIntoOptions(rawArgs: string[]) {
  const args = arg({ '--entry': String, '--debug': Boolean }, { argv: rawArgs.slice(2) })

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

  fs.copy(paths.templateFolder, paths.docsFolder, (err) => {
    if (err) return console.error(err)

    if (options.command === 'build') {
      exec(`vite build ${paths.docsFolder} --outDir ../.build --emptyOutDir`)
    } else if (options.command === 'dev') {
      exec(`vite ${paths.docsFolder}`)
    }
  })
}

cli(process.argv)
