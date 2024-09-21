import { Router } from "express"
import passport from "passport"

const viewsRouter = Router()

viewsRouter.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { firstName, lastName, email, age } = req.user

        res.render('profile', { firstName, lastName, email, age })
    } catch (error) {
        console.error(error)
        res.status(500).send('internal server error')
    }
})

viewsRouter.get('/', (req, res) => {
    res.redirect('/login')
})

viewsRouter.get('/register', (req, res) => {
    res.render('register')
})

viewsRouter.get('/login', (req, res) => {
    res.render('login')
})

export default viewsRouter
