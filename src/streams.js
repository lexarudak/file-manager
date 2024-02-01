import { getMessage } from "./messages.js"
import { store } from "./store.js"
import { transformStream } from "./transformStream.js"
import { pipeline } from "stream/promises"


const startStream = async () => {
  process.chdir(process.env.HOME)
  const { helloMessage, enterCommand } = getMessage(store.username)
  const { currentDir } = getMessage(process.cwd())

  console.log([helloMessage, currentDir, enterCommand].join('\n'))
  
  pipeline(process.stdin, transformStream, process.stdout)
}

export {
  startStream
}