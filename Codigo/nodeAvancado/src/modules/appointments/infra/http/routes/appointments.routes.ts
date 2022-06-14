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
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/appointmentsRepository';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => 
// {
//     console.log(request.user); 

//     const list = await appointmentsRepository.find();
//     return response.json(list);
// });

appointmentsRouter.post('/', async (request, response) => 
{
    const appointmentsRepository = new AppointmentsRepository();

    const { provider_id, date } = request.body;

    const dateISO = parseISO(date); 

    const createAppointments = new CreateAppointmentService(appointmentsRepository);
   
    const appointments = await createAppointments.execute({date : dateISO, provider_id : provider_id})

    return response.json(appointments);
});

export default appointmentsRouter;