import User from '../infra/typeorm/entities/user';
import ICreateUsersDTO from '../dtos/ICreateUsersDTO';

export default interface IUsersRepository {
    findById(id: string ): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: ICreateUsersDTO): Promise<User | undefined>;
    save(user: User): Promise<User>;
}