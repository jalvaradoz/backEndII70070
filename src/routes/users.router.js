import { Router } from "express"
import { getUsers, getUserById, saveUser } from '../controllers/users.controller.js'

const usersRouter = Router()

usersRouter.get('/users', getUsers)
usersRouter.get('/users/:uid', getUserById)
usersRouter.put('/editUser/:uid', saveUser)

export default usersRouter