import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser'
import { contentType } from '../middlewares/content-type'
import { cors } from '../middlewares/cors'

export default (app: Express): void => {
  const middlewares = [bodyParser, cors, contentType]

  app.use(middlewares.map(item => item))
}
