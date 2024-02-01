import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getMessage } from "./messages.js"
import { store } from "./store.js"

export const getDirname = () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename);
  return __dirname
}

export const closeStream = () => {
  console.log(getMessage(store.username).goodbyeMessage);
  process.stdin.destroy()
}
