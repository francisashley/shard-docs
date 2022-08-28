#!/usr/bin/env node
import shell from './shellTools.js'
import fs from 'fs-extra'
import chalk from 'chalk'

// 1) retrieve args
const args = shell.getArgs(process.argv)

// 2) show start up message and paths
if (args.debug) {
  shell.echo(chalk.blue.bold('Shard-docs cli was started from: ') + shell.getCurrDir())
  shell.echo(chalk.blue.bold('Shard-docs cli bin is located in: ') + shell.getBinDir())
  shell.echo(chalk.blue.bold('Template directory is located at: ') + shell.getTemplateDir())
  shell.echo(chalk.blue.bold('Dev directory is located at: ') + shell.getDevDir())
  shell.echo(chalk.blue.bold('Build directory is located at: ') + shell.getBuildDir())
  shell.echo(chalk.blue.bold('Entry file is located at: ') + shell.getEntryFilePath(args.entry))
}

// 3) Copy template dir to local folder
await fs.copy(shell.getTemplateDir(), shell.getDevDir(), (err) => {
  if (err) return console.error(err)

  // 4) Run vite
  if (args.command === 'build') {
    shell.exec(`vite build ${shell.getDevDir()} --outDir ../.build --emptyOutDir`)
  } else if (args.command === 'dev') {
    shell.exec(`vite ${shell.getDevDir()}`)
  }
  // else if (args.command === 'preview') {
  //   shell.exec(`cd .docs && vite preview ${shell.getDevDir()} --open / && cd ../`)
  // }
})
