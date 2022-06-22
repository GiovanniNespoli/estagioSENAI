import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeUserTokenRepository from "../repositories/fakes/FakeUserTokenRepository";
import ResetPasswordService from "./ResetPasswordService";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokenRepository = new FakeUserTokenRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPassword = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokenRepository,
            fakeHashProvider
        );
    });

    it('Should be able to reset the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Gigio',
            email: 'gigio@gmail.com',
            password: '123'
        });

        const { token } = await fakeUserTokenRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPassword.execute({
            password: '123123',
            token,
        });

        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('123123');
        expect(updatedUser?.password).toBe('123123');
    });

    it('Should not be able to reset the password with non-existing token', async () => {
        expect(
            resetPassword.execute({
                token: 'non-exisiting-token',
                password: '123'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to reset the password with non-existing user', async () => {

        const { token } = await fakeUserTokenRepository.generate('non-existing-token');
        
        expect(
            resetPassword.execute({
                password: '123',
                token,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should be not abçe to reset the password if passed more tha 2 houres', async () => {
        
        const user = await fakeUsersRepository.create({
            name: 'Gigio',
            email: 'gigio@gmail.com',
            password: '123'
        });
        
        const { token } = await fakeUserTokenRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementation(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        });
        
        expect(
            resetPassword.execute({
                password: '123',
                token,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

});