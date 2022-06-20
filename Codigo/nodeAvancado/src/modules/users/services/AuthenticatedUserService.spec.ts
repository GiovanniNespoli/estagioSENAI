import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticatedUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
    it('Should be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const authenticatedUserService = new AuthenticatedUserService(fakeUsersRepository);
        const createUserService = new CreateUserService(fakeUsersRepository);

        await createUserService.execute({
            name: 'Giovanni',
            email: 'gio@gmail.com',
            password: '123'
        });

        const authenticateUser = await authenticatedUserService.execute({
            email : 'gio@gmail.com',
            password : '123'
        });

        expect(authenticateUser).toHaveProperty('token');
    });

});