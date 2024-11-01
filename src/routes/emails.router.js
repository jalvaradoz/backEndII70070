import { Router } from "express"
import { sendMail } from "../controllers/emails.controller.js"

const emailsRouter = Router()

emailsRouter.post('/sendMail', sendMail)

export default emailsRouter