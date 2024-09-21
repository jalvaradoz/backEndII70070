import { Router } from "express"
import passport from "passport"

const sessionsRouter = Router()

sessionsRouter.post('/register', passport.authenticate('register', { session: false }), async (req, res) => {
    res.redirect('/login')
})

sessionsRouter.post('/login', passport.authenticate('login', { session: false }), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: 'Error', error: 'Invalid Credentials' })

    res.cookie('jwt', req.user.token, { httpOnly: true })
    res.redirect('/profile')
})

sessionsRouter.get('/logout', (req, res) => {
    res.clearCookie('jwt')
    res.redirect('/login')
});

sessionsRouter.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send({ status: 'success', user: req.user })
})


export default sessionsRouter
