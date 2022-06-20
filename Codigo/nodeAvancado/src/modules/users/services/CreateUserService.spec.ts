import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
    it('Should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const createUser = new CreateUserService(fakeUsersRepository);

        const newUser = await createUser.execute({
            name: 'Giovanni',
            email: 'gio@gmail.com',
            password: '123'
        });

        expect(newUser).toHaveProperty('id');
    });

    it('Should be not to create a user that was already been created', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const createUser = new CreateUserService(fakeUsersRepository);
        const email = 'gio@gmail.com';

        await createUser.execute({
            name: 'Giovanni',
            email: email,
            password: '123',
        });

        expect(
            createUser.execute({
                name: 'Giovanni',
                email: email,
                password: '123',
            })).rejects.toBeInstanceOf(AppError);
    });
});