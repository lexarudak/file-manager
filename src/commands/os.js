import { setError, setMessage } from "../utils/helpers.js"
import { messages } from "../utils/messages.js"
import os from "os"

export const error = () => ({
  action: () => setError(messages.invalidInput)
})

export const eol = () => ({
  action: () => {
    const escapedEol = os.EOL.replace(/\n/g, '\\n').replace(/\r/g, '\\r');
    setMessage(escapedEol)
  }
})

export const cpus = () => ({
  action: () => {
    const cpus = os.cpus().map(({ model }) => model)
    const message = `Overall amount of CPUS: ${cpus.length}${os.EOL}${os.EOL}${cpus.join(os.EOL)}`
    setMessage(message)
  }
})

export const homedir = () => ({
  action: () =>  setMessage(os.homedir())
})

export const username = () => ({
  action: () =>  setMessage(process.env.USER || process.env.USERNAME)
})

export const architecture = () => ({
  action: () =>  setMessage(process.arch)
})