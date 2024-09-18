import { Router } from "express"

const viewsRouter = Router()

viewsRouter.get('/profile', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login')
        }

        const { firstName, lastName, email, age } = req.session.user;
        res.render('profile', { firstName, lastName, email, age });
    } catch (error) {
        console.error(error);
        res.status(500).send('internal server error');
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
