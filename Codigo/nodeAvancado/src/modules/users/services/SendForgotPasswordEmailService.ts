import { inject, injectable } from "tsyringe";

import IUsersRepository from "../repositories/IUsersRepository";
import IMailProvider from '@shared/container/providers/MailProvider/models/IMairlProvider';
import IUserTokenRepository from "../repositories/IUserTokenRepository";

import AppError from "@shared/errors/AppError";

interface IRequest{
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
    ){}

    public async execute({email}: IRequest): Promise<void>{
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if(!checkUserExists)
        {
            throw new AppError('User does not exists')
        }

        await this.userTokenRepository.generate(checkUserExists.id)

        this.mailProvider.sendMail(email, 'pedido de recuperação recebido')
    }

}