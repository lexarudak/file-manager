import { exit, error, up, ls, cd} from "./actions.js"

export const commands = {
  error,
  up,
  ls,
  cd,
  ".exit": exit,
}