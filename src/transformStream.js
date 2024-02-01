import { Transform } from "stream"
import { controller } from "./controller.js"

export const transformStream = new Transform({
  transform(chunk, _, callback) {
    const { message, action } = controller(chunk)();

    this.push(`${message}\n`)
    if (action) action()

    callback();
  },
});