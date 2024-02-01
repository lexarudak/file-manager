import { Transform } from "stream"
import { controller } from "./controller.js"

export const transformStream = new Transform({
  async transform(chunk, _, callback) {
    const { message, before, after } = controller(chunk);

    if (before) await before(this)
    this.push(`${message()}\n`)
    if (after) await after()

    callback();
  },
});