import os from "os"

export const getMessage = (value) => ({
  helloMessage: `${os.EOL}Welcome to the File Manager, ${value}!`,
  goodbyeMessage: `Thank you for using File Manager, ${value}, goodbye!`,
  currentDir: `You are currently in ${value}`,
})

export const messages = {
  enterCommand: `${os.EOL}*Please, enter your command*${os.EOL}`,
  invalidInput: 'Invalid input',
  upperError: 'You are trying to get above the home directory',
  operationError: 'Operation failed',
}

export const infoTable = [
  {
    Command: 'info',
    Description: 'Print table with all command list',
  },
  {
    Command: 'up',
    Description: 'Go upper from current directory',
  },
  {
    Command: 'cd path_to_directory',
    Description: 'Go to dedicated folder',
  },
  {
    Command: 'ls',
    Description: 'Get list of files and folders in directory',
  },
  {
    Command: 'cat path_to_file',
    Description: "Read file",
  },
  {
    Command: 'add new_file_name',
    Description: 'Create empty file in current directory',
  },
  {
    Command: 'rn path_to_file new_filename',
    Description: 'Rename file',
  },
  {
    Command: 'cp path_to_file path_to_new_directory',
    Description: 'Copy file',
  },
  {
    Command: 'mv path_to_file path_to_new_directory',
    Description: 'Move file',
  },
  {
    Command: 'rm path_to_file',
    Description: 'Delete file',
  },
  {
    Command: 'os --EOL',
    Description: 'Operating system info',
  },
  {
    Command: 'os --cpus',
    Description: 'Get host machine CPUs info',
  },
  {
    Command: 'os --homedir',
    Description: 'Get home directory',
  },
  {
    Command: 'os --username',
    Description: 'Get current system user name',
  },
  {
    Command: 'os --architecture',
    Description: 'Get CPU architecture',
  },
  {
    Command: 'hash path_to_file',
    Description: 'Calculate hash for file',
  },
  {
    Command: 'compress path_to_file path_to_destination',
    Description: 'Compress file ',
  },
  {
    Command: 'decompress path_to_file path_to_destination',
    Description: 'Decompress file. "use path in "',
  },
  {
    Command: '.exit',
    Description: 'Finish work',
  },
]

export const notice = 'Notice! When using commands with two arguments, use "quoted path/your.file" if you have spaces in the path or file name'