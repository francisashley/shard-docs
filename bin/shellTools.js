import shell from 'shelljs'
import yargs from 'yargs/yargs'
import { Spinner } from 'cli-spinner'
import path from 'path'
import url from 'url'
import fs from 'fs'

const echo = (text) => {
  return shell.echo(text)
}

const longEcho = (text, callback = (complete = () => {}) => {}) => {
  var spinner = new Spinner(`%s "${text}"`).setSpinnerString('|/-\\').start()
  callback(() => spinner.stop())
}

const getArgs = (argv) => {
  argv = yargs(argv.slice(2))
    .demandCommand(1)
    .check((argv, options) => {
      if (!['dev', 'build'].includes(argv._[0])) {
        throw new Error(`Unknown command "${argv._[0]}". Please use "dev", "build" or "preview".`)
      }
      if (!argv._[1]) {
        throw new Error(
          `Missing an entry file. Please provided a file like \`yarn shard-docs ${argv._[0]} ./docs.config.tsx.\``
        )
      }
      return true
    }).argv
  return {
    command: argv._[0],
    entry: argv._[1],
    debug: Boolean(argv.debug),
  }
}

const getCurrDir = () => {
  return process.cwd()
}

const getBinDir = () => {
  const binPath = url.fileURLToPath(import.meta.url)
  return path.dirname(binPath)
  return url.fileURLToPath(import.meta.url)
}

const getScaffoldDir = () => {
  return path.resolve(getBinDir(), '../scaffolding')
}

const getDevDir = () => {
  return path.resolve(getCurrDir(), './.docs')
}

const getBuildDir = () => {
  return path.resolve(getCurrDir(), './.build')
}

const getEntryFilePath = (entryFilePath) => {
  return path.resolve(getCurrDir(), entryFilePath)
}

const exec = shell.exec

export default {
  echo,
  longEcho,
  getArgs,
  getCurrDir,
  getBinDir,
  getScaffoldDir,
  getDevDir,
  getBuildDir,
  getEntryFilePath,
  exec,
}
