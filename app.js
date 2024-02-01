import { setUsername } from "./src/set_username.js"
import { startStream } from "./src/streams.js"

const app = async () => {
  setUsername()

  await startStream()
}

export default app