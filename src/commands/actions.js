import { getMessage, messages } from "../messages.js"
import { store } from "../store.js"
import { resolve, dirname, join, basename } from "path"
import { getCurrentDirFiles, getAvailableName, checkNoSameFile } from "../helpers.js"
import { writeFile, rename, unlink } from "fs/promises"
import { createReadStream, createWriteStream } from "fs"
import { pipeline } from "stream/promises"
import { Transform } from "stream"

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
    before: async () => {
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

export const cat = (path) => ({
  before: async (transformThis) => {
    const pushToMain = new Transform({
      transform(chunk, _, callback) {
        transformThis.push(chunk)
        callback();
      }, 
      flush(callback) {
        transformThis.push('\n')
        callback()
      }
    });
  
    try {
      const readStream = createReadStream(resolve(path))
      await pipeline(readStream, pushToMain)
    } catch {
      console.log(messages.operationError);
    }
    
  },
  message: () => getMessage(process.cwd()).currentDir,
})

export const add = (path) => ({
  before: async () => {
    try {
      await writeFile(resolve(path), '', { flag: "wx" })
    } catch {
      console.log(messages.operationError);
    }
  },
  message: () => getMessage(process.cwd()).currentDir,
})

export const rn = (path_to_file, new_filename) => ({
  before: async () => {
    try {
      const oldPath = resolve(path_to_file)
      const newPath = join(dirname(oldPath), new_filename)
      await rename(oldPath, newPath, { flag: "wx" })
    } catch {
      console.log(messages.operationError);
    }
  },
  message: () => getMessage(process.cwd()).currentDir,
})

export const cp = (path_to_file, path_to_new_directory) => ({
  before: async () => {
    try {
      const pathFrom = resolve(path_to_file)
      const newPath = resolve(path_to_new_directory)

      const name = await getAvailableName(newPath, basename(pathFrom))

      const readStream = createReadStream(pathFrom)
      const writeStream = createWriteStream(join(newPath, name))
      
      await pipeline(readStream, writeStream)
    } catch {
      console.log(messages.operationError);
    }
  },
  message: () => getMessage(process.cwd()).currentDir,
})

export const mv = (path_to_file, path_to_new_directory) => ({
  before: async () => {
    try {
      const pathFrom = resolve(path_to_file)
      const newPath = resolve(path_to_new_directory)

      await checkNoSameFile(join(newPath, basename(pathFrom)))

      const readStream = createReadStream(pathFrom)
      const writeStream = createWriteStream(join(newPath, basename(pathFrom)))
      
      await pipeline(readStream, writeStream)
      await unlink(pathFrom)

    } catch {
      console.log(messages.operationError);
    }
  },
  message: () => getMessage(process.cwd()).currentDir,
})

export const rm = (path_to_file) => ({
  before: async () => {
    try {
      await unlink(resolve(path_to_file))
    } catch {
      console.log(messages.operationError);
    }
  },
  message: () => getMessage(process.cwd()).currentDir,
})