import { Router } from "express"
import passport from "passport"

const sessionsRouter = Router()

sessionsRouter.post('/register', passport.authenticate('register', { failureRedirect: '/failedRegister' }), async (req, res) => {
    res.redirect('/login')
})

sessionsRouter.get('failedRegister', (req, res) => {
    console.log('strategy failed')
    res.send({ error: 'failed' })
})

sessionsRouter.post('/login', passport.authenticate('login', { failureRedirect: 'failedLogin' }), async (req, res) => {

    if (!req.user) return res.status(400).send({ status: 'Error', error: 'invalid credentials' })

    req.session.user = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        age: req.user.age
    }

    res.redirect('/profile')
})

sessionsRouter.get('/failedLogin', (req, res) => {
    console.log('strategy failed')
    res.send({ error: 'failed' })
})

sessionsRouter.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error while logging out')
        }

        res.redirect('/login')
    })
})


export default sessionsRouter
