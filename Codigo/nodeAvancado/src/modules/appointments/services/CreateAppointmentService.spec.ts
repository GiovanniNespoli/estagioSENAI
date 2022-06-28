import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepositoriy";
import AppError from "@shared/errors/AppError";

let fakeAppointmentsRepositoriy: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

//Teste unitário depende dele mesmo 

//describe -> descreve sobre oq será feita os appointments
describe('CreateAppointment', () => {

    beforeEach(() => {
        fakeAppointmentsRepositoriy = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepositoriy,
        );
    });

    //it -> podemos passar uma forma de descrição sobre o teste
    it('should be able to create a new appointment', async () => {

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        //teste
        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: "111111",
            user_id: "12",
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe("111111");
        expect(appointment.user_id).toBe("12")
    });

    it('Should not be able to create same appointments that is already exist', async () => {

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await createAppointment.execute({
            date: new Date(2020,4, 10, 13),
            provider_id: "111111",
            user_id: '12',
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020,4, 10, 13),
                provider_id: "111111",
                user_id: '12',
            })).rejects.toBeInstanceOf(AppError)
    });

    it('Should not be able to create an appointments on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 11),
                provider_id: "111111",
                user_id: '12',
            })).rejects.toBeInstanceOf(AppError)
    });

    it('Should not be able to create an appoitment with the same user as provider', async () => {
        expect(
            createAppointment.execute({
                provider_id: '123',
                user_id: '123',
                date: new Date(2020, 4, 10, 11),
            })
        ).rejects.toBeInstanceOf(AppError)
    });

    it('Should not be able to create an appoitment before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        expect(
            createAppointment.execute({
                provider_id: 'provider_id',
                user_id: 'user_id',
                date: new Date(2020, 4, 11, 7),
            }),
        ).rejects.toBeInstanceOf(AppError);

        expect(
            createAppointment.execute({
                provider_id: 'provider_id',
                user_id: 'user_id',
                date: new Date(2020, 4, 11, 18),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
