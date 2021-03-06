import nodemailer, { TestAccount, Transporter } from 'nodemailer';
import MailMessage from 'nodemailer/lib/mailer/mail-message';

class SendMailService {

    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            this.client = this.transportFor(account);
        });
    }

    async execute(to: string, subject: string, body: string) {
        const message = await this.client.sendMail({
            to,
            subject,
            html: body,
            from: "NPS <noreply@nps.com.br>"
        });

        console.log('Message send: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
 
    private transportFor(account: TestAccount): Transporter {
        return nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });
    }
}

export default new SendMailService();