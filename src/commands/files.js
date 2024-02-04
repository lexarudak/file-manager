import { getMessage, messages, infoTable } from "../utils/messages.js"
import { store } from "../store/store.js"
import { resolve, dirname, join, basename } from "path"
import { 
  getCurrentDirFiles, 
  getAvailableName, 
  checkNoSameFile, 
  setError, 
  setMessage,
  setNewExt,
  removeExt
} from "../utils/helpers.js"
import { writeFile, rename, unlink } from "fs/promises"
import { createReadStream, createWriteStream } from "fs"
import { pipeline } from "stream/promises"
import { Transform } from "stream"
import { osController } from "../controllers/os_controller.js"
import sysOs from "os"
import { createHash } from "crypto"
import { createBrotliCompress, createBrotliDecompress } from "zlib"

export const error = () => ({
  action:() => setError(messages.invalidInput)
})

export const exit = () => ({
  action: () => {
    setMessage(getMessage(store.username).goodbyeMessage)
    store.end = true
    process.stdin.pause()
  }
})

export const up = () => ({
  action: () => process.chdir("..")
})

export const ls = () => ({
    action: async () => {
      const data = await getCurrentDirFiles()
      console.table(data)
    },
  })

export const info = () => ({
    action: async () => {
      console.table(infoTable)
    },
  })

export const cd = (path) => ({
  action: () => {
    try {
      process.chdir(path)
    } catch {
      setError(path ? messages.operationError : messages.invalidInput);
    }
  },
})

export const cat = (path) => ({
  action: async (transformThis) => {
    const pushToMain = new Transform({
      transform(chunk, _, callback) {
        transformThis.push(chunk)
        callback();
      }, 
      flush(callback) {
        transformThis.push(sysOs.EOL)
        callback()
      }
    });
  
    try {
      const readStream = createReadStream(resolve(path))
      await pipeline(readStream, pushToMain)
    } catch {
      setError(messages.operationError);
    }
    
  },
})

export const add = (path) => ({
  action: async () => {
    try {
      await writeFile(resolve(path), '', { flag: "wx" })
    } catch {
      setError(messages.operationError);
    }
  }
})

export const rn = (path_to_file, new_filename) => ({
  action: async () => {
    try {
      const oldPath = resolve(path_to_file)
      const newPath = join(dirname(oldPath), new_filename)
      await rename(oldPath, newPath, { flag: "wx" })
    } catch {
      setError(new_filename ? messages.operationError : messages.invalidInput);
    }
  },
})

export const cp = (path_to_file, path_to_new_directory) => ({
  action: async () => {
    try {
      const pathFrom = resolve(path_to_file)
      const newPath = resolve(path_to_new_directory)

      const name = await getAvailableName(newPath, basename(pathFrom))

      const readStream = createReadStream(pathFrom)
      const writeStream = createWriteStream(join(newPath, name))
      
      await pipeline(readStream, writeStream)
    } catch {
      setError(path_to_new_directory ? messages.operationError : messages.invalidInput);
    }
  },
})

export const mv = (path_to_file, path_to_new_directory) => ({
  action: async () => {
    try {
      const pathFrom = resolve(path_to_file)
      const newPath = resolve(path_to_new_directory)

      await checkNoSameFile(join(newPath, basename(pathFrom)))

      const readStream = createReadStream(pathFrom)
      const writeStream = createWriteStream(join(newPath, basename(pathFrom)))
      
      await pipeline(readStream, writeStream)
      await unlink(pathFrom)

    } catch {
      setError(path_to_new_directory ? messages.operationError : messages.invalidInput);
    }
  }
})

export const rm = (path_to_file) => ({
  action: async () => {
    try {
      await unlink(resolve(path_to_file))
    } catch {
      setError(messages.operationError);
    }
  }
})

export const hash = (path_to_file) => ({
  action: async () => {
    try {
      const readStream = createReadStream(resolve(path_to_file))
      const hash = createHash("sha256")

      await pipeline(readStream, hash)
      setMessage(hash.digest('hex'))
    } catch {
      setError(messages.operationError);
    }
  }
})

export const compress = (path_to_file, path_to_destination) => ({
  action: async () => {
    try {
      const pathFrom = resolve(path_to_file)
      const newPath = resolve(path_to_destination)

      const zipName = setNewExt(basename(pathFrom), "br")
      const name = await getAvailableName(newPath, zipName)

      const readStream = createReadStream(pathFrom)
      const writeStream = createWriteStream(join(newPath, name))
      
      await pipeline(readStream, createBrotliCompress(), writeStream)
    } catch {
      setError(path_to_destination ? messages.operationError : messages.invalidInput);
    }
  }
})

export const decompress = (path_to_file, path_to_destination) => ({
  action: async () => {
    try {
      const pathFrom = resolve(path_to_file)
      const newPath = resolve(path_to_destination)

      const normalName = removeExt(basename(pathFrom), "br")
      const name = await getAvailableName(newPath, normalName)

      const readStream = createReadStream(pathFrom)
      const writeStream = createWriteStream(join(newPath, name))
      
      await pipeline(readStream, createBrotliDecompress(), writeStream)
    } catch {
      setError(path_to_destination ? messages.operationError : messages.invalidInput);
    }
  }
})

export const os = (command) => osController(command)