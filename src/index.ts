import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { Commands } from './commands'
import {
	Args as parseModlistArgs,
	default as runParseModlist,
	module as parseManifestModule,
} from './commands/parse-modlist'

let command: Commands = 'parse-modlist'
let commandArgs: parseModlistArgs = { path: '' }

export function setCommand(_command: Commands) {
	command = _command
}

export function setCommandArgs(_commandArgs: parseModlistArgs) {
	commandArgs = _commandArgs
}

export interface Argv {
	[x: string]: unknown
	path: string
	verbose: boolean | undefined
	_: (string | number)[]
	$0: string
}

export const argv = yargs(hideBin(process.argv))
	.scriptName('curseforge-to-modrinth')
	.usage('$0 <cmd> [args]')
	.help()
	.alias('h', 'help')
	.command<parseModlistArgs>(
		'parse-manifest',
		'Parse a CurseForge modlist and returns both Modrinth URLS and mods not on Modrinth',
		parseManifestModule
	)
	.option('verbose', {
		alias: 'v',
		type: 'boolean',
		description: 'Runs with verbose logging',
	})
	.demandCommand()
	.parseSync()

switch (command) {
	case 'parse-modlist':
		runParseModlist(commandArgs as parseModlistArgs)
		break
	default:
		process.exit(0)
}
