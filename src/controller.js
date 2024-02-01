import { commands } from "./commands/commands.js"

export const controller = (chunk) => {
  const line = chunk.toString().trim()
  const [command, arg1, arg2] = line.toLowerCase().split(" ").filter((val) => val !== "")
  return commands[command] ? commands[command](arg1, arg2) : commands.error()
}