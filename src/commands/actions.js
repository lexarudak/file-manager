import { getMessage } from "../messages.js"
import { store } from "../store.js"
import { resolve } from "path"
import { getCurrentDirFiles } from "../helpers.js"

export const error = () => ({
  message: getMessage().invalidInput
})

export const exit = () => ({
  message: getMessage(store.username).goodbyeMessage,
  after: () => process.stdin.pause()
})

export const up = () => ({
  message: getMessage(process.cwd()).currentDir,
  after: () => {
    const currentDir = process.cwd()
    const homeDir = process.env.HOME
    if (!(currentDir === homeDir)) {
      process.chdir(resolve(currentDir, '..'))
    }
  }
})

export const ls = () => ({
    message: getMessage(process.cwd()).currentDir,
    after: async () => {
      const data = await getCurrentDirFiles()
      console.table(data)
    },
  })

// export const cd = (path) => ({
//   message: getMessage(process.cwd()).currentDir,
//   action: () => {
//     const currentDir = process.cwd()
//     const homeDir = process.env.HOME
//     if (!(currentDir === homeDir)) {
//       process.chdir(resolve(currentDir, '..'))
//     }
//   }
// })