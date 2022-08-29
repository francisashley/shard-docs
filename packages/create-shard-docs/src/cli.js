import arg from 'arg'
import inquirer from 'inquirer'
import { createProject } from './main.js'

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg({}, { argv: rawArgs.slice(1) })

  return {
    projectName: args._[1],
  }
}

async function promptForMissingOptions(options) {
  const questions = []
  if (!options.projectName) {
    questions.push({
      type: 'string',
      name: 'projectName',
      message: 'Project name:',
      default: 'docs',
    })
  }
  const answers = await inquirer.prompt(questions)
  return {
    projectName: options.projectName || answers.projectName,
  }
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args)
  options = await promptForMissingOptions(options)
  await createProject(options)
}
