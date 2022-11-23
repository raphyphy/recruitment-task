import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieSession from 'cookie-session'
import { createToken } from './utils/createToken'
import { checkJwt } from './middleware/checkJwt'
import { errorHandler } from './middleware/errorHandler'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  cookieSession({
    name: 'session',
    keys: [ process.env.JWT_SECRET as string ], // can accept multiple secrets
    signed: false,
    secure: false,

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
)

app.get('/auth/signout', (req: Request, res: Response) => {
  req.session = null
  res.json({
    session: req.session
  })
})

app.get('/auth/check', checkJwt, (req: Request, res: Response) => {
  req.session!.views = (req.session!.views || 0) + 1
  res.json({
    jwt: req.session!.jwt || 'User is not logged in',
    views: req.session!.views
  })
})

app.post('/auth/signin', (req: Request, res: Response) => {
  let user = {
    id: 'abc123',
    email: 'test@vocovo.com',
  }

  const newToken = createToken(user)

  req.session = {
    jwt: newToken,
  }
  res.json({...user, newToken})
})

app.get('/auth/ping', (req, res) => {
  return res.json({ message: 'auth pong' })
})

app.use(errorHandler)

export default app
