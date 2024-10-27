import express from 'express'
import { engine } from 'express-handlebars'
import cookieParser from 'cookie-parser'
import viewsRouter from './routes/views.router.js'
import sessionsRouter from './routes/sessions.router.js'
import usersRouter from './routes/users.router.js'
import __dirname from './utils.js'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import './config/dB.config.js'

const app = express()
const PORT = 8080

app.engine('handlebars', engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser())


initializePassport()
app.use(passport.initialize())

app.use('/', viewsRouter)
app.use('/', sessionsRouter)
app.use('/', usersRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


export default app