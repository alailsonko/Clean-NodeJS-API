import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser'
import { cors } from '../middlewares/cors'

export default (app: Express): void => {
  const middlewares = [bodyParser, cors]

  for (const i of middlewares) {
    app.use(i)
  }
}
