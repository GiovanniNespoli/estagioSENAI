import { inject, injectable } from "tsyringe";

import IUsersRepository from "../repositories/IUsersRepository";
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokenRepository from "../repositories/IUserTokenRepository";

import AppError from "@shared/errors/AppError";
import path from "path";

interface IRequest {
    email: string
}

@injectable()
export default class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokenRepository')
        private userTokenRepository: IUserTokenRepository
    ) { }

    public async execute({ email }: IRequest): Promise<void> {
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (!checkUserExists) {
            throw new AppError('User does not exists')
        }

        const { token } = await this.userTokenRepository.generate(checkUserExists.id)

        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

        await this.mailProvider.sendMail({
            to: {
                name: checkUserExists.name,
                email: checkUserExists.email
            },
            subject: '[Go barber] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: checkUserExists.name,
                    link: `http://localhost/reset_password?token=${token}`,
                    token,
                },
            },
        });
    };
    
}
''