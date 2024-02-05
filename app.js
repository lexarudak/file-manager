import { setUsername } from "./src/utils/helpers.js"
import mainPipeline from "./src/main_pipeline.js"
import { exit } from "./src/commands/files.js";
import os from "os"
import { getMessage } from "./src/utils/messages.js"
import { store } from './src/store/store.js'

const app = async () => {
  setUsername()

  process.on('SIGINT', () => {
    console.log(os.EOL);
    console.log(getMessage(store.username).goodbyeMessage);
    console.log(os.EOL);
    exit().action()
  });

  await mainPipeline()
}

export default app