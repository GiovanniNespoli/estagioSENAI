import userModel from '../models/user';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

interface Request {
    name : string,
    email : string,
    password : string
}


export default class CreateUserService {
    public async execute({name, email, password} : Request): Promise<userModel | null>
    {
        const userRepository = getRepository(userModel);

        const checkUserExist = await userRepository.findOne({
            where : { email },
        });

        if (checkUserExist) {
            throw new Error('Email adress already exist!!');
        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password : hashedPassword,
        });

        await userRepository.save(user);

        return user;
    }
}