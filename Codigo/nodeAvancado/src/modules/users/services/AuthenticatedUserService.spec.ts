import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticatedUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository : FakeUsersRepository;
let fakeHashProvider : FakeHashProvider;
let authenticatedUserService : AuthenticatedUserService;
let createUserService : CreateUserService;

describe('AuthenticateUser', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        authenticatedUserService = new AuthenticatedUserService(
            fakeUsersRepository,
            fakeHashProvider
        );

        createUserService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider
        );
    });

    it('Should be able to authenticate', async () => {

        const user = await createUserService.execute({
            name: 'Giovanni',
            email: 'gio@gmail.com',
            password: '123'
        });

        const authenticateUser = await authenticatedUserService.execute({
            email: 'gio@gmail.com',
            password: '123'
        });

        expect(authenticateUser).toHaveProperty('token');
        expect(authenticateUser.user).toEqual(user);
    });

    it('not should be authenticate with non existing user', async () => {
        expect(
            authenticatedUserService.execute({
                email: 'nespoli@gmail.com',
                password: '123'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('not should be authenticate with wrong passworld user', async () => {

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