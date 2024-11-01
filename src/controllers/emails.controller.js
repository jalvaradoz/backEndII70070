import EmailDAO from "../dao/classes/email.dao.js"
import EmailDTO from "../dao/dto/email.dto.js"


const mailService = new EmailDAO()

export const sendMail = async (req, res) => {
    try {
        const emailData = new EmailDTO(req.body)
        const result = await mailService.sendMail(emailData)
        res.status(200).json({ message: 'Email sent successfully', result })
    } catch (error) {
        res.status(500).json({ message: 'Error sending email', error })
        console.log(error);
    }
}