import { Transform } from "stream"
import { controller } from "./controllers/controller.js"
import { printCurrentDir } from "./utils/helpers.js";
import { store } from "./store/store.js";
import os from "os"

export const transformStream = new Transform({
  async transform(chunk, _, callback) {
    const { action } = controller(chunk);

    await action(this)

    this.push(store.error || store.message)
    if (store.error || store.message) this.push(os.EOL)
    if (!store.end) this.push(printCurrentDir())
    this.push(os.EOL)
    this.push(os.EOL)

    store.error = ''
    store.message = ''

    callback();
  },
});