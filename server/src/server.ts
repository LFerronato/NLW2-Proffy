import express from 'express'
import cors from 'cors'
import routes from './routes'

const app = express()

app
  .use(cors())
  .use(express.json())
  .use(routes)

  .listen(3333, () => console.log('🚀 Server is running on port 3333'))
