import { Router } from 'express';
/**uuidv4 biblioteca para gerar id */
import { uuid } from 'uuidv4';
/**bibiloteca back/front usada para dates
 * startOfHour -> pega a data e hora e coloca minutos, segudos ... em 0
 * parseISO -> 
 */
import { startOfHour, parseISO, isEqual } from 'date-fns';

/**Criamos um modelo para evitar a repetição de uma criação de uma interface a cada 
 * file de appointment
 */
import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/appointmentsRepository';

const appointmentsRouter = Router();

const apointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => 
{
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    /**percorre o array usando o find
     * usa a função isEqual (funcao do date-fns) para verificacao do date
     * ele passa por cada dado do array procurando se há algum date existente ao que está 
     * sendo passado no body
    */
    const findAppintInSameDate = appo.find(x => isEqual(parsedDate, x.date));

    if ( findAppintInSameDate ) {
        return response
        .status(400)
        .json({message : 'This appointment is already booked'});
    };

    /**Puxamos o metodo do nosso repository e passamos de 
     * parametro no metodo create os dados requisitados e já 
     * tratado para o cadastro
     */
    const newAppoints = apointmentsRepository.create(provider, parsedDate);

    return response.json(newAppoints);
});

export default appointmentsRouter;