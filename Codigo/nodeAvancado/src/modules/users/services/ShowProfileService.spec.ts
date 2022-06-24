import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        showProfileService = new ShowProfileService(fakeUsersRepository);

    });

    it('Should be able to show the  profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Giovanni',
            email: 'gio@gmail.com',
            password: '123',
        });

        const profile = await showProfileService.execute({
            user_id: user.id,
        });

        expect(profile.name).toBe('Giovanni')
        expect(profile.email).toBe('gio@gmail.com')
    });

    it('Should be not able to show the  profile', async () => {
        expect(
            showProfileService.execute({
                user_id: 'non-existing-user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

});