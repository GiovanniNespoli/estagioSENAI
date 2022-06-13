
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import Users from '@modules/users/infra/typeorm/entities/user';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';


interface IRequest {
    email : string,
    password : string
}



export default class AuthenticateUserService {
    constructor(private userRepository: IUsersRepository){}

    public async execute({email,password} : IRequest) : Promise<{user : Users } & {token : string}>
    {

        const user = await this.userRepository.findByEmail(email);

        if (!user)
        {
            throw new AppError('Incorret email/password combination', 401);
        };

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched)
        {
            throw new AppError('Incorret email/password combination', 401);
        };

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn : expiresIn,
        });

        return {
            user,
            token,
        };
    
    }
}