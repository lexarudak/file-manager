import { exit, error, up, ls, cd, cat, add, rn} from "./actions.js"

export const commands = {
  error,
  up,
  ls,
  cd,
  cat,
  add,
  rn,
  ".exit": exit,
}