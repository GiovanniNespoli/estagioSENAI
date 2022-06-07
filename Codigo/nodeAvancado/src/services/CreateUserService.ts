import userModel from '../models/user';
import { getRepository } from 'typeorm';

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

        const user = userRepository.create({
            name,
            email,
            password,
        });

        await userRepository.save(user);

        return user;
    }
}