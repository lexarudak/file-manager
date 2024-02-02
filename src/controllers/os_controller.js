import * as osCommands from "../commands/os.js"

export const osController = (command) => {
  if (!command) return osCommands.error()
  const [, flag] = command.toLowerCase().split("--")
  return osCommands[flag] ? osCommands[flag]() : osCommands.error()
}