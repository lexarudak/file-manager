import * as files from "../commands/files.js"

const commands = {
  ...files,
  ".exit": files.exit
}

export const controller = (chunk) => {
  const line = chunk.toString().trim()

  const [command, ...args] = line.toLowerCase().match(/"[^"]+"|[^ ]+/g).map(word => word.replace(/^"|"$/g, ''));
  return commands[command] ? commands[command](args) : commands.error()
}