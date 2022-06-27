import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Users from "../infra/typeorm/entities/user";
import IUsersRepository from "../repositories/IUsersRepository"

interface IRequest {
    user_id: string;
}

@injectable()
export default class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository : IUsersRepository,
    ){}
    
    public async execute({user_id}: IRequest): Promise<Users>{
        const user = await this.usersRepository.findById(user_id);

        if(!user) {
            throw new AppError('User not found');
        }

        return user;
    }
} 