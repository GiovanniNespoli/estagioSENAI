import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import FakeUserTokenRepository from "../repositories/fakes/FakeUserTokenRepository";

import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmail : SendForgotPasswordEmailService;


describe('SendForgotPasswordEmail', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokenRepository = new FakeUserTokenRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository, 
            fakeMailProvider,
            fakeUserTokenRepository
        );
    });

    it('Should be able to send a recuperation email to the user', async ()=> {

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({
            name: 'Andrade',
            email: 'andradinho@gmail.com',
            password: '123',
        });

        await sendForgotPasswordEmail.execute({
            email: 'andradinho@gmail.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('Should be not able to recover a non-existing user password', async () => {

        expect(
            sendForgotPasswordEmail.execute({
                email: 'gio@gmail.com'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should be able to send a recuperation email to the user', async ()=> {
        
        const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');
        
        const user = await fakeUsersRepository.create({
            name: 'Andrade',
            email: 'andradinho@gmail.com',
            password: '123',
        });

        await sendForgotPasswordEmail.execute({
            email: 'andradinho@gmail.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});