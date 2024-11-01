import { Router } from "express"
import passport from "passport"
import UserRepository from "../repository/user.repository.js"

const sessionsRouter = Router()

sessionsRouter.post('/register', passport.authenticate('register', { session: false }), async (req, res) => {
    res.redirect('/login')
})

sessionsRouter.post('/login', passport.authenticate('login', { session: false }), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: 'Error', error: 'Invalid Credentials' })

    console.log('JWT Token:', req.user.token)

    res.cookie('jwt', req.user.token, { httpOnly: true })
    res.redirect('/profile')
})

sessionsRouter.get('/logout', (req, res) => {
    res.clearCookie('jwt')
    res.redirect('/login')
})

sessionsRouter.get('/current', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = await UserRepository.getUserById(req.user._id)
        if (!user) {
            return res.status(404).send({ status: 'error', message: 'User not found' });
        }
        res.send({ status: 'success', user });
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).send({ status: 'error', message: 'Failed to retrieve user information' });
    }
})


export default sessionsRouter
