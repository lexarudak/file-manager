import { exit, error, up, ls, cd, cat, add} from "./actions.js"

export const commands = {
  error,
  up,
  ls,
  cd,
  cat,
  add,
  ".exit": exit,
}