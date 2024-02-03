import { getMessage, infoTable, messages } from "./utils/messages.js"
import { store } from "./store/store.js"
import { transformStream } from "./transform_stream.js"
import { pipeline } from "stream/promises"
import os from "os"



const mainPipeline = async () => {
  process.chdir(process.env.HOME)
  const { helloMessage } = getMessage(store.username)
  const { currentDir } = getMessage(process.cwd())

  console.log(helloMessage)
  console.table(infoTable);
  console.log(currentDir);
  console.log(messages.enterCommand);
  
  pipeline(process.stdin, transformStream, process.stdout)
}

export default mainPipeline