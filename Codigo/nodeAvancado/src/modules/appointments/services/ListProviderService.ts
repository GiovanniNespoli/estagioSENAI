import Users from "@modules/users/infra/typeorm/entities/user";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface IRequest{
    user_id: string;
}

@injectable()
export default class ListProviderService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    public async execute({user_id}: IRequest): Promise<Users[]>{
        const users = await this.usersRepository.findAllProviders({
            except_user_id: user_id,
        });

        return users;
    };
}