import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/user';

import AppError from '@shared/errors/AppError';

import IUserRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

interface IRequest {
    id : string,
    avatarFileName : string | undefined
}

@injectable()
export default class UpdateUserAvatarService{
    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepository,
        
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
        ){}

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
            await this.storageProvider.deleteFile(user.avatar);           
        };

        const filename = await this.storageProvider.saveFile(avatarFileName!);

        user.avatar = filename!;

        await this.usersRepository.save(user);

        return user;
    }
}