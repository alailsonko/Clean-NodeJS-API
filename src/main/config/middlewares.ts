import { Express } from 'express'
import { bodyParser, cors, contentType } from '../middlewares'

export default (app: Express): void => {
  const middlewares = [bodyParser, cors, contentType]

  app.use(middlewares.map(item => item))
}
