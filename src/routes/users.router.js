import { Router } from "express"
import { getUsers, getUserById } from '../controllers/users.controller.js'

const usersRouter = Router()

usersRouter.get('/users', getUsers)
usersRouter.get('/users/:uid', getUserById)

export default usersRouter