import chalk from 'chalk'
import fs from 'node:fs'
import ncp from 'ncp'
import path from 'node:path'
import { promisify } from 'node:util'
import { execa } from 'execa'
import Listr from 'listr'
import { projectInstall } from 'pkg-install'

const access = promisify(fs.access)
const copy = promisify(ncp)

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  })
}

async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory,
  })
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialise Git'))
  }
  return
}

export async function createProject(options) {
  options.targetDirectory = path.resolve(
    options.targetDirectory || process.cwd(),
    options.projectName
  )

  const currentFileUrl = import.meta.url
  const templateDir = path.resolve(new URL(currentFileUrl).pathname, '../../template')
  options.templateDirectory = templateDir

  const tasks = new Listr([
    {
      title: 'Copy project files',
      task: () => copyTemplateFiles(options),
    },
    {
      title: 'Initialise git',
      task: () => initGit(options),
    },
    {
      title: 'Install dependencies',
      task: () =>
        projectInstall({
          cwd: options.targetDirectory,
        }),
    },
  ])

  await tasks.run()

  console.log('%s Project ready', chalk.green.bold('DONE'))
  return true
}
