import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepositoriy";
import AppError from "@shared/errors/AppError";

//Teste unitário depende dele mesmo 

//describe -> descreve sobre oq será feita os appointments
describe('CreateAppointment', () => {
    
    //it -> podemos passar uma forma de descrição sobre o teste
    it('should be able to create a new appointment', async () => {

        //teste
       const fakeAppointmentsRepositoriy = new FakeAppointmentsRepository();
       const createAppointment = new CreateAppointmentService(
        fakeAppointmentsRepositoriy,
        );

       const appointment = await createAppointment.execute({
        date: new Date(),
        provider_id: "111111",
       });

       expect(appointment).toHaveProperty('id');
       expect(appointment.provider_id).toBe("111111");
    });

    it('Should not be able to create same appointments that is already exist', async () => {
        const fakeAppointmentsRepositoriy = new FakeAppointmentsRepository();

        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepositoriy,
        );

        const appointmentDate = new Date(2020, 4, 10, 14);

         await createAppointment.execute({
            date: appointmentDate,
            provider_id: "111111",
        });

        expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: "111111",
            })).rejects.toBeInstanceOf(AppError)
    });
});
