export const getMessage = (value) => ({
  helloMessage: `\nWelcome to the File Manager, ${value}!`,
  goodbyeMessage: `Thank you for using File Manager, ${value}, goodbye!`,
  currentDir: `You are currently in ${value}`,
})

export const messages = {
  enterCommand: '\n*Please, enter your command*',
  invalidInput: 'Invalid input',
  upperError: 'You are trying to get above the home directory'
}
