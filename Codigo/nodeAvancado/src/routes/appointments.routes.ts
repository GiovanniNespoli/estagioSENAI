//Routes -> Receber uma requisição, chaamr outro arquivo e devolver uma resposta

import { Router } from 'express';
/**bibiloteca back/front usada para dates
 * startOfHour -> pega a data e hora e coloca minutos, segudos ... em 0
 * parseISO -> 
 */
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

/**Criamos um modelo para evitar a repetição de uma criação de uma interface a cada 
 * file de appointment
 */
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/appointmentsRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();



appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => 
{
    console.log(request.user);

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const list = await appointmentsRepository.find();
    return response.json(list);
});

appointmentsRouter.post('/', async (request, response) => 
{
    try {

        const { provider_id, date } = request.body;

        const dateISO = parseISO(date); 

        const createAppointments = new CreateAppointmentService();
   
        const appointments = await createAppointments.execute({date : dateISO, provider_id : provider_id})

        return response.json(appointments);

    } catch (err) {
        return response.status(400).json(err.message);
    }
});

export default appointmentsRouter;