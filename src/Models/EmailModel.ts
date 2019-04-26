import * as NodeMailer from 'nodemailer'

import Model from './Model'
import { Config } from '../Constants'

class EmailModel extends Model implements Universis.Email.Model {

    /**
     * Instance of mail transporter.
     */
    private transporter

    public constructor() {
        super()

        this.transporter = NodeMailer.createTransport({
            service: Config.email.service,
            auth: {
                type: 'OAuth2',
                user: Config.email.sender,
                clientId: Config.email.clientId,
                clientSecret: Config.email.clientSecret,
                accessToken: Config.email.accessToken,
                refreshToken: Config.email.refreshToken,
            }
        })
    }

    public sendHtml(to: string, subject: string, content: string): Promise<any> {
        return this.sendEmail({
            to,
            subject: Config.email.subjectPrefix + subject,
            text: content,
            from: `${Config.email.senderName} <${Config.email.sender}>`
        })
    }

    public sendText(to: string, subject: string, content: string): Promise<any> {
        return this.sendEmail({
            to,
            subject: Config.email.subjectPrefix + subject,
            html: content,
            from: `${Config.email.senderName} <${Config.email.sender}>`
        })
    }

    private sendEmail(options: Universis.Map<string>): Promise<any> {
        return this.transporter.sendMail(options)
    }

}

export default new EmailModel()