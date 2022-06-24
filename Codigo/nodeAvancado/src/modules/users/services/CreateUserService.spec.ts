import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository : FakeUsersRepository;
let fakeHashProvider : FakeHashProvider;
let createUser : CreateUserService;

describe('CreateUser', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider
        );
    });

    it('Should be able to create a new user', async () => {
        const newUser = await createUser.execute({
            name: 'Giovanni',
            email: 'gio@gmail.com',
            password: '123'
        });

        expect(newUser).toHaveProperty('id');
    });

    it('Should be not to create a user that was already been created', async () => {
    
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