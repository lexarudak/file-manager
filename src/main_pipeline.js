import { getMessage, infoTable, messages } from "./utils/messages.js"
import { store } from "./store/store.js"
import { transformStream } from "./transform_stream.js"
import { pipeline } from "stream/promises"
import os from "os"
import { info } from "./commands/files.js"



const mainPipeline = async () => {
  process.chdir(os.homedir())

  const { helloMessage } = getMessage(store.username)
  const { currentDir } = getMessage(process.cwd())

  console.log(helloMessage)
  await info().action()
  console.log(currentDir);
  console.log(messages.enterCommand);
  
  await pipeline(process.stdin, transformStream, process.stdout)
  
}

export default mainPipeline