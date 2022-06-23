import { sign } from 'jsonwebtoken';
import { injectable, inject} from 'tsyringe';

import authConfig from '@config/auth';
import Users from '@modules/users/infra/typeorm/entities/user';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';


interface IRequest {
    email : string,
    password : string
}


@injectable()
export default class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,
        
        @inject('HashProvider')
        private hashProvideer: IHashProvider
        ){}

    public async execute({email,password} : IRequest) : Promise<{user : Users } & {token : string}>
    {

        const user = await this.userRepository.findByEmail(email);

        if (!user)
        {
            throw new AppError('Incorret email/password combination', 401);
        };

        const passwordMatched = await this.hashProvideer.compareHash(password, user.password);

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