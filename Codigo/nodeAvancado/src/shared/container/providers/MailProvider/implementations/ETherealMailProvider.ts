import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';


import ISendMailDTO from '../dtos/ISendEmailDTO';
import IMailProvider from "../models/IMailProvider";
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class ETheralMailProvider implements IMailProvider {

    private client: Transporter;

    constructor(

        @inject('MailTemplateProvider')
        private mailTemplateProvider : IMailTemplateProvider,
    ) {
        nodemailer.createTestAccount().then(account => {

            // console.log('aaaaaaa')
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });

            this.client = transporter;
        });
    }

    public async sendMail({to, from, subject, templateData}: ISendMailDTO): Promise<undefined> {

        const message = await this.client.sendMail({
            from: {
                name: from?.name || 'Equipe GoBarber',
                address: from?.email || 'equipe@gobarber.com.br' 
            }, // sender address
            to: {
                name: to.name,
                address: to.email,
            }, // list of receivers
            subject: "Recuperação de senha", // Subject line
            html: await this.mailTemplateProvider.parse(templateData ) // plain text body
        });

        console.log(message)

        console.log("Message sent: %s", message.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        return message || undefined
    }
}