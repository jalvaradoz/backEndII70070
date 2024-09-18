import express from 'express'
import { engine } from 'express-handlebars'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import viewsRouter from './routes/views.router.js'
import sessionsRouter from './routes/sessions.router.js'
import __dirname from './utils.js'
import MongoStore from 'connect-mongo'
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

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://joey2596:6Gsb0szOnn5mCODC@cluster0.lsakre9.mongodb.net/backEndII?retryWrites=true&w=majority&appName=Cluster0',
        ttl: 15,
    }),
    secret: 'abc123',
    resave: false,
    saveUninitialized: false
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/', viewsRouter)
app.use('/', sessionsRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


export default app