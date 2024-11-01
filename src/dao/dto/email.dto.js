export default class EmailDTO {
    constructor({ to, subject, html }) {
        this.from = process.env.EMAIL_USER;
        this.to = to;
        this.subject = subject;
        this.html = html;
    }
}