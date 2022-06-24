import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfileService = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );

    });

    it('Should be able to update the  profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Giovanni',
            email: 'gio@gmail.com',
            password: '123',
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'Gigio',
            email: 'gigio@gmail.com'
        });

        expect(updatedUser.name).toBe('Gigio')
        expect(updatedUser.email).toBe('gigio@gmail.com')
    });

    it('Should be not able to update the  profile from non-existing-user', async () => {
        expect(
            updateProfileService.execute({
                user_id: 'non-existing-user-id',
                name: 'test',
                email: 'test@gmail.com'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should be not able to change to another user email', async () => {
        fakeUsersRepository.create({
            name: 'Giovanni',
            email: 'gio@gmail.com',
            password: '123',
        });

        const user = await fakeUsersRepository.create({
            name: 'Nespoli',
            email: 'nespoli@gmail.com',
            password: '123',
        });

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: 'Gigio',
            email: 'gio@gmail.com',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('Should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Giovanni',
            email: 'gio@gmail.com',
            password: '123456',
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'Gio',
            email: 'gigio@gmail.com',
            old_password: '123456',
            password: '1234',
        });

        expect(updatedUser.password).toBe('1234');
    });

    it('Should be not able to update the password with the wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Giovanni',
            email: 'gio@gmail.com',
            password: '123',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'Gio',
                email: 'gigio@gmail.com',
                old_password: '1234535456353',
                password: '1234',
            }),
        ).rejects.toBeInstanceOf(AppError)
    });
});