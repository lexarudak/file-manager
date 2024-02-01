import { exit, error, up, ls, cd, cat} from "./actions.js"

export const commands = {
  error,
  up,
  ls,
  cd,
  cat,
  ".exit": exit,
}