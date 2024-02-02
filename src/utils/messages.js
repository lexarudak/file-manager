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
