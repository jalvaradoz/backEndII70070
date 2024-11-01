import { transport } from "../../config/email.config.js"

export default class EmailDAO {
    async sendMail(mailOptions) {
        try {
            const result = await transport.sendMail(mailOptions)
            return result
        } catch (error) {
            throw new Error('Error in DAO', error)
        }
    }
}