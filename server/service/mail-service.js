const nodemailer = require('nodemailer')
const User = require('./../models/user-model')

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(email, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: `Account activation on ${process.env.API_URL}`,
            text: '123',
            html: `
                <div>
                    <h1>To activate follow the link</h1>
                    <a href=${link}>${link}</a>
                </div>
            `
        })
    }
}

module.exports = new MailService()