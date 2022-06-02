//Routes -> Receber uma requisição, chaamr outro arquivo e devolver uma resposta

import { Router } from 'express';
/**bibiloteca back/front usada para dates
 * startOfHour -> pega a data e hora e coloca minutos, segudos ... em 0
 * parseISO -> 
 */
import { parseISO } from 'date-fns';

/**Criamos um modelo para evitar a repetição de uma criação de uma interface a cada 
 * file de appointment
 */
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/appointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => 
{
    const list = appointmentsRepository.listAll();
    return response.json(list);
});

appointmentsRouter.post('/', (request, response) => 
{
    try {
        const { provider, date } = request.body;

        const dateISO = parseISO(date); 

        const createAppointments = new CreateAppointmentService(appointmentsRepository);
   
        const appointments = createAppointments.execute({date : dateISO, provider : provider})

        return response.json(appointments);

    } catch (err) {
        return response.status(400).json('This appointment is already booked');
    }
});

export default appointmentsRouter;