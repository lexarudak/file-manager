import { commands } from "./commands/commands.js"

export const controller = (chunk) => {
  const line = chunk.toString().trim()
  const [command, arg] = line.toLowerCase().split(" ").filter((val) => val !== "")
  return commands[command] ? commands[command] : commands.error
}