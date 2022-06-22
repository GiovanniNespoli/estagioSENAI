import IUserTokenRepository from "../IUserTokenRepository";

import Users from "@modules/users/infra/typeorm/entities/user";
import UserToken from "@modules/users/infra/typeorm/entities/UserToken";
import { uuid } from "uuidv4";


export default class UserTokenRepository implements IUserTokenRepository {
    private users: UserToken[] = [];

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            id: uuid(),
            token: uuid(),
            user_id,
            created_at: new Date(),
            updated_at: new Date()
        });

        this.users.push(userToken);

        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = this.users.find(findToken => findToken.token == token);

        return userToken;
    }
}