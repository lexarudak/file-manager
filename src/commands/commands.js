import { exit, error, up, ls, cd, cat, add, rn, cp} from "./actions.js"

export const commands = {
  error,
  up,
  ls,
  cd,
  cat,
  add,
  rn,
  cp,
  ".exit": exit,
}