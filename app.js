import { setUsername } from "./src/utils/helpers.js"
import mainPipeline from "./src/main_pipeline.js"

const app = async () => {
  setUsername()

  await mainPipeline()
}

export default app