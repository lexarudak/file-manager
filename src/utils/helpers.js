import { join } from 'path';
import { readdir, access } from "fs/promises"
import { getMessage } from "./messages.js"
import { store } from '../store/store.js';

export const setError = (error) => {
  store.error = error
}

export const setMessage = (message) => {
  store.message = message
}

export const printCurrentDir = () => getMessage(process.cwd()).currentDir

export const getCurrentDirFiles = async () => {
  const filesList = await readdir(process.cwd(), { withFileTypes: true })
  const dirsAndFiles = filesList.reduce((acc, file) => {
    file.isDirectory() ? acc.dirs.push({
      Name: file.name,
      Type: "directory"
    }) : acc.files.push({
      Name: file.name,
      Type: "file"
    })
    return acc
  }, {
    files: [],
    dirs: []
  })

  const { dirs, files } = dirsAndFiles
  return [ ...dirs, ...files ]
}

const makeCopyName = (name, copyNumber) => {
  const arr = name.split('.')

  if (arr.length < 2) {
    if (copyNumber === 1) return `${name}_copy`
    return `${name}_copy_${copyNumber - 1}`
  }
  const ext = arr.pop()
  const withoutExt = arr.join('.')

  if (copyNumber === 1) return `${withoutExt}_copy.${ext}`
  return `${withoutExt}_copy_${copyNumber - 1}.${ext}`
}


export const setNewExt = (name, newExt) => `${name}.${newExt}`

export const removeExt = (name, ext) => {
  const arr = name.split('.')
  if (arr.length < 2) return name
  const oldExt = arr.pop()
  if (oldExt === ext) return arr.join('.')
  throw new Error("not an archive")
}



export const getAvailableName = async (path, name, copyNumber) => {
  const nameToCheck = copyNumber ? makeCopyName(name, copyNumber) : name 

  try {
    await access(join(path, nameToCheck))
    return await getAvailableName(path, name, copyNumber ? copyNumber + 1 : 1) 
  } catch {
    return nameToCheck
  }
}

export const checkNoSameFile = async (path) => {
  try {
    await access(path)
    throw 'EXIST'
  } catch (e) {
    if (e === "EXIST") throw new Error("File already exist")
    return Promise.resolve()
  }
} 

export const setUsername = () => {
  const args = process.argv.slice(2);
  const usernameInfo = args.find((val) => val.startsWith("--username=")) || ''
  const [, username] = usernameInfo.split('=');
  store.username = username || 'User'
}