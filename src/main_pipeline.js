import { getMessage, messages } from "./utils/messages.js"
import { store } from "./store/store.js"
import { transformStream } from "./transform_stream.js"
import { pipeline } from "stream/promises"
import os from "os"



const mainPipeline = async () => {
  process.chdir(process.env.HOME)
  const { helloMessage } = getMessage(store.username)
  const { currentDir } = getMessage(process.cwd())

  console.log([helloMessage, currentDir, messages.enterCommand].join(os.EOL))
  
  pipeline(process.stdin, transformStream, process.stdout)
}

export default mainPipeline