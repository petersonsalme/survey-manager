import nodemailer, { TestAccount, Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

class SendMailService {

    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            this.client = this.transportFor(account);
        });
    }

    async execute(to: string, subject: string, variables: Object, templatePath: string) {
        const template = fs.readFileSync(templatePath).toString('utf-8');

        const mailTemplateParse = handlebars.compile(template);
        const html = mailTemplateParse(variables);

        const message = await this.client.sendMail({
            to,
            subject,
            html,
            from: "NPS <noreply@nps.com.br>"
        });

        console.log('Message sent: %s', message.messageId);
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