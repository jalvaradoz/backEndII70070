import passport from "passport"
import userModel from "../models/user.model.js"
import { createHash, isValidPassword } from "../utils.js"
import jwt from 'jsonwebtoken'

const JWTStrategy = jwt.Strategy
const extractJWT = jwt.ExtractJWT

const cookieExtractor = (req) => {
    let token = null
    console.log(req.headers)
    if (req && req.headers) {
        token = req.headers.authorization.split(' ')[1]
    }
    return token
}

const initializePassport = () => {

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: extractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'coderSecret'
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))


    passport.use('register', new localStrategy({
        passReqToCallback: true, usernameField: 'email'
    }, async (req, userName, password, done) => {
        const { firstName, lastName, email, age } = req.body
        try {
            let user = await userModel.findOne({ email: userName })
            if (user) {
                console.log('user exists')
                return done(null, false)
            }

            const newUser = {
                firstName,
                lastName,
                email,
                age,
                password: createHash(password)
            }

            let result = await userModel.create(newUser)
            return done(null, result)
        } catch (error) {
            return done('Error trying to get user' + error)
        }
    }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id)
        done(null, user)
    })

    passport.use('login', new localStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username })
            if (!user) {
                console.log('user does not exist')
                return done(null, false)
            }
            if (!isValidPassword(password, user.password)) return done(null, false)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))
}

export default initializePassport