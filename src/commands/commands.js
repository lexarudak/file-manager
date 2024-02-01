import { exit, error, up, ls } from "./actions.js"

export const commands = {
  error,
  up,
  ls,
  ".exit": exit,
}