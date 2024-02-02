import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir, access } from "fs/promises"

export const getDirname = () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename);
  return __dirname
}

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
  if (copyNumber === 1) return `${name}_copy`
  return `${name}_copy_${copyNumber - 1}`
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