export const getMessage = (value) => ({
  helloMessage: `\nWelcome to the File Manager, ${value}!`,
  goodbyeMessage: `Thank you for using File Manager, ${value}, goodbye!`,
  currentDir: `You are currently in ${value}`,
  enterCommand: '\n*Please, enter your command*',
  invalidInput: 'Invalid input'
})
