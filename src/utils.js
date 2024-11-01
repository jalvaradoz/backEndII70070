import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

//bcrypt
//password hash
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

//validate password
export const isValidPassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword)

// JWT
const PRIVATE_KEY = 'CoderSecret'

export const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' })
    return token
}

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).send({ error: 'not authenticated' })
    const token = authHeader.split(' ')[1]
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({ error: 'you `re not authorized' })
        req.user = credentials.user
        next()
    })
}

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) {
                return next(err)
            }
            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
            }

            req.user = user
            next()
        })(req, res, next)
    }
}
