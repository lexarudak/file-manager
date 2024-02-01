import { store } from './store.js'

const startKey = "--username="

export const setUsername = () => {
  const args = process.argv.slice(2);
  const usernameInfo = args.find((val) => val.startsWith(startKey))
  const [, username] = usernameInfo.split('=');
  store.username = username
}