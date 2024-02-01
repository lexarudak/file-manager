import { getMessage } from "../messages.js"
import { store } from "../store.js"

export const error = () => ({
  message: getMessage().invalidInput
})

export const exit = () => ({
  message: getMessage(store.username).goodbyeMessage,
  action: () => process.stdin.pause()
})