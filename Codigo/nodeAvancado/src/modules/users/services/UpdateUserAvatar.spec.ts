import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import AppError from "@shared/errors/AppError";

import UpdateUserAvatar from './UpdateUserAvatarServices';

let fakeUsersRepository : FakeUsersRepository;
let fakeStorageProvider : FakeStorageProvider;
let updateUserAvatar : UpdateUserAvatar;

describe('UpdateUserAvatar', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeStorageProvider = new FakeStorageProvider();

        updateUserAvatar = new UpdateUserAvatar(
            fakeUsersRepository,
            fakeStorageProvider
        );
    });

    it('Should be able to create a new avatar', async () => {
        

        const user = await fakeUsersRepository.create({
            name: 'Giovanni',
            email: 'gio@gmail.com',
            password: '123'
        });

        const updateAvatar = await updateUserAvatar.execute({
            id: user.id,
            avatarFileName: 'avatar.jpg'
        });

        expect(user.avatar).toBe('avatar.jpg');

    });

    it('Should not able to update avatar from non existing user', async () => {
        expect(
            updateUserAvatar.execute({
                id: 'non-existing',
                avatarFileName: 'avatar.jpg',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should be able to delete the avatar that the alerady has', async () => {

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const user = await fakeUsersRepository.create({
            name: 'Giovanni',
            email: 'gio@gmail.com',
            password: '123'
        });

        await updateUserAvatar.execute({
            id: user.id,
            avatarFileName: 'avatar.jpg',
        });

        await updateUserAvatar.execute({
            id: user.id,
            avatarFileName: 'avatar2.jpg',
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg');

    });
});