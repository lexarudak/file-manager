import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readdir, mkdir, copyFile } from "fs/promises"

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