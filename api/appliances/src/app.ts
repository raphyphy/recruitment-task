import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import cookieSession from 'cookie-session'

import routes from './routes/v1/appliances/appliances'
import { errorHandler } from './middleware/errorHandler'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  cookieSession({
    name: 'session',
    signed: false,
    secure: false
  })
)
app.get('/appliances/ping', (req: Request, res: Response) => {
  return res.json({ message: 'appliances pong' })
})

app.use('/appliances', routes) // we can add /v1/ for these routes since this is under v1

app.use(errorHandler)


export default app
