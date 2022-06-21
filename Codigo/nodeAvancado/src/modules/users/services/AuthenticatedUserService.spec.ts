import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticatedUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
    it('Should be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticatedUserService = new AuthenticatedUserService(
            fakeUsersRepository,
            fakeHashProvider    
        );

        const createUserService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider
        );


        const user = await createUserService.execute({
            name: 'Giovanni',
            email: 'gio@gmail.com',
            password: '123'
        });

        const authenticateUser = await authenticatedUserService.execute({
            email : 'gio@gmail.com',
            password : '123'
        });

        expect(authenticateUser).toHaveProperty('token');
        expect(authenticateUser.user).toEqual(user);
    });

    it('not should be authenticate with non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticatedUserService = new AuthenticatedUserService(
            fakeUsersRepository,
            fakeHashProvider    
        );

        const createUserService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider
        );

        expect(
            authenticatedUserService.execute({
                email: 'nespoli@gmail.com',
                password: '123'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('not should be authenticate with wrong passworld user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticatedUserService = new AuthenticatedUserService(
            fakeUsersRepository,
            fakeHashProvider    
        );

        const createUserService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider
        );

        await createUserService.execute({
            name: 'Nespolindo',
            email: 'nespoli@gmail.com',
            password: '123'
        });
        
        expect(
            authenticatedUserService.execute({
                email: 'nespoli@gmail.com',
                password: '12'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

});