import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import Users from '../models/user';
import auth from '../config/auth';


interface Request {
    email : string,
    password : string
}



export default class AuthenticateUserService {
    public async execute({email,password} : Request) : Promise<{user : Users } & {token : string}>
    {
        
        const userRepository = getRepository(Users);

        const user = await userRepository.findOne({
            where : { email },
        });

        if (!user)
        {
            throw new Error('Incorret email/password combination');
        };

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched)
        {
            throw new Error('Incorret email/password combination');
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