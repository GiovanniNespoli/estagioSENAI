import { getRepository } from 'typeorm';
import fs from 'fs';

import path from 'path';

import uploadConfig from '../config/upload';
import User from '../models/user';

interface Request {
    id : string,
    avatarFileName : string,
};

export default class UpdateAvatarService {

    public async execute({id, avatarFileName} : Request) : Promise<User>
    {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(id);

        if (!user)
        {
            throw new Error('Only authenticated users can change avatar.');
        }

        if (user.avatar)
        {
            //deletar avatar anterior
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFilePathExist = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFilePathExist)
            {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;
        await usersRepository.save(user);

        return user;
    }
};