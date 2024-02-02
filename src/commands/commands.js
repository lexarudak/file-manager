import { exit, error, up, ls, cd, cat, add, rn, cp, mv, rm} from "./actions.js"

export const commands = {
  error,
  up,
  ls,
  cd,
  cat,
  add,
  rn,
  cp,
  mv,
  rm,
  ".exit": exit,
}