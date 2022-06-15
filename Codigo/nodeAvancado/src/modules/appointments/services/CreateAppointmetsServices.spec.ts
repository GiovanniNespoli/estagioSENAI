import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepositoriy";

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
        provider_id: '123',
       });

       expect(appointment).toHaveProperty('id');
       expect(appointment.provider_id).toBe('123');
    });
});
