
import path from 'path';
import fs from 'fs';

import uploadconfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/user';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
    id : string,
    avatarFileName : string | undefined
}


export default class UpdateUserAvatarService{
    constructor(private usersRepository: IUserRepository){}

    public async execute({ id, avatarFileName} : IRequest) : Promise<User>
    {
        //Promise que retorna um user respectivo, id pego pelo header te um token
        const user = await this.usersRepository.findById(id);

        //se não estiver logado...
        if (!user) {
            throw new AppError('Only authenticated users can change avatar', 401);
        }
        
        //se o usuario possuir um avatar já cadastrado, deletar o antigo...
        if (user.avatar) {
            //Deletar avatar anterior

            const userAvatarFilePath = path.join(uploadconfig.directory, user.avatar);
                                                        //stat() -> traz os status de um arquivo
            const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExist)
            {
                await fs.promises.unlink(userAvatarFilePath);
            }
        };

        user.avatar = avatarFileName!;
        await this.usersRepository.save(user);

        return user;
    }
}