import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";

import Users from "../infra/typeorm/entities/user";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
    user_id: string,
    name: string,
    email: string,
    old_password?: string,
    password?: string
}

@injectable()
export default class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) { }

    public async execute({ user_id, name, email, password, old_password }: IRequest): Promise<Users> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User does not found')
        }

        const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

        if (userWithUpdatedEmail && userWithUpdatedEmail.id != user_id) {
            throw new AppError('Email already in use!!');
        }

        user.name = name;
        user.email = email;

        if (password && !old_password) {
            throw new AppError('Insert the old password')
        }

        if (password && old_password) {
            const checkOldPassword = await this.hashProvider.compareHash(
                old_password,
                user.password
            )

            if(!checkOldPassword) {
                throw new AppError('Old password does not match');
            }

            user.password = await this.hashProvider.generateHash(password);
        }
        
        return this.usersRepository.save(user);

    };

}