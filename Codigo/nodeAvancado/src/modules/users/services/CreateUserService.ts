import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/user';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    name : string,
    email : string,
    password : string
}


@injectable()
export default class CreateUserService {

    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
        ){}
    

    public async execute({name, email, password} : IRequest): Promise<User | undefined>
    {

        const checkUserExist = await this.userRepository.findByEmail(email);

        if (checkUserExist) {
            throw new AppError('Email adress already exist!!');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.userRepository.create({
            name,
            email,
            password : hashedPassword,
        });

        return user;
    }
}