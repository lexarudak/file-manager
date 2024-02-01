import { getMessage, messages } from "../messages.js"
import { store } from "../store.js"
import { resolve, isAbsolute } from "path"
import { getCurrentDirFiles } from "../helpers.js"

export const error = () => ({
  message: () => messages.invalidInput
})

export const exit = () => ({
  message: () => getMessage(store.username).goodbyeMessage,
  after: () => process.stdin.pause()
})

export const up = () => ({
  message: () => getMessage(process.cwd()).currentDir,
  before: () => {
    const currentDir = process.cwd()
    const homeDir = process.env.HOME
    if (!(currentDir === homeDir)) {
      process.chdir("..")
    } else {
      console.log(messages.upperError);
    }
  }
})

export const ls = () => ({
    message: () => getMessage(process.cwd()).currentDir,
    after: async () => {
      const data = await getCurrentDirFiles()
      console.table(data)
    },
  })

export const cd = (path) => ({
  before: () => {
    try {
      if(resolve(path).startsWith(process.env.HOME)) {
        process.chdir(path)
      } else {
        throw new Error('up')
      }
    } catch (e) {
      console.log(e.message === 'up' ? messages.upperError : messages.invalidInput);
    }
  },
  message: () => getMessage(process.cwd()).currentDir,
})