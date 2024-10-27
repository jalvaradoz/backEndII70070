import passport from "passport"
import local from 'passport-local'
import userModel from "../dao/models/user.model.js"
import { createHash, isValidPassword } from "../utils.js"
import jwt from 'jsonwebtoken'
import passportJwt from 'passport-jwt'


const localStrategy = local.Strategy
const JWTStrategy = passportJwt.Strategy
const extractJwt = passportJwt.ExtractJwt

const cookieExtractor = (req) => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies['jwt']
    }
    return token
}

const initializePassport = () => {

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: extractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: 'CoderSecret'
    }, async (jwt_payload, done) => {
        try {
            const user = await userModel.findById(jwt_payload.user._id)
            if (!user) return done(null, false)
            return done(null, user)
        } catch (error) {
            return done(error, false)
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
                password: createHash(password),
                role: 'user'
            }

            let result = await userModel.create(newUser)
            return done(null, result)
        } catch (error) {
            return done('Error trying to get user' + error)
        }
    }
    ))

    passport.use('login', new localStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'User not found' })
            }
            if (!isValidPassword(password, user.password)) {
                return done(null, false, { message: 'Incorrect password' })
            }

            const token = jwt.sign({ user }, 'CoderSecret', { expiresIn: '24h' })
            return done(null, { user, token })
        } catch (error) {
            return done(error)
        }
    }));
}

export default initializePassport